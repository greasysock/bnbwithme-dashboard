import _ from 'lodash'
import jwt from 'jsonwebtoken'
import moment from 'moment'
import humps from 'lodash-humps'
import dehumps from 'snakecase-keys'

import bnbwithme from '../api/bnbwithme'
import {
    FETCH_PROPERTIES,
    UPDATE_PROPERTY,
    CREATE_PROPERTY,
    DESTROY_PROPERTY,
    FETCH_PROPERTY,

    FETCH_PROPERTY_ICALS,
    FETCH_PROPERTY_ICAL,
    UPDATE_PROPERTY_ICAL,
    CREATE_PROPERTY_ICAL,
    DESTROY_PROPERTY_ICAL,

    FETCH_PROPERTY_RESERVATIONS,
    FETCH_RESERVATION,

    SIGN_IN, 
    SIGN_OUT,
    SAVE_USER_SESSION,

    ASSIGN_CLEANER_TO_RESERVATION,
    REMOVE_CLEANER_FROM_RESERVATION,

    FETCH_USERS,
    FETCH_USER,
    CREATE_USER,
    UPDATE_USER,
    DESTROY_USER,
    SIGN_IN_LOCAL_STORAGE
} from './types'

const _userHeaders = (getState, jwt=null) => {
    if(jwt){
        return {headers: {'Authorization' : jwt} }
    }
    return { headers:  { 'Authorization': getState().currentUser.jwt } }
}

export const fetchPropertiesAndReservations = () => async (dispatch, getState) => {
    await dispatch(fetchProperties())
    const propertyIds = _.map(getState().properties, 'id')
    const promises = []
    propertyIds.forEach(id=>promises.push(dispatch(fetchPropertyReservations(id))))
    await Promise.all(promises)
}

export const fetchProperties = () => async (dispatch, getState) => {
    const response = await bnbwithme.get('/properties', _userHeaders(getState))
    dispatch({type:FETCH_PROPERTIES, payload: humps(response.data)})
}

export const createProperty = (formValues, callback = null) => async (dispatch, getState) => {
    const response = await bnbwithme.post('/properties', dehumps({property: formValues}), _userHeaders(getState))
    console.log(response)
    dispatch({type:CREATE_PROPERTY, payload: response.data})
    if(callback){
        callback()
    }
} 

export const updateProperty = (id, formValues, callback = null) => async (dispatch, getState) => {
    const response = await bnbwithme.put(`/properties/${id}`, dehumps({property: formValues}), _userHeaders(getState))
    console.log(response)
    dispatch({type:UPDATE_PROPERTY, payload: response.data})
    if(callback){
        callback()
    }
} 

export const destroyProperty = (id, callback = null) => async (dispatch, getState) => {
    await bnbwithme.delete(`/properties/${id}`, _userHeaders(getState))
    dispatch({type:DESTROY_PROPERTY, payload: id})
    if(callback){
        callback()
    }
} 

export const fetchPropertyReservations = propertyId => async (dispatch, getState) => {
    const response = await bnbwithme.get(`/properties/${propertyId}/reservations`, _userHeaders(getState))
    dispatch({type:FETCH_PROPERTY_RESERVATIONS, payload: humps(response.data)})
}

const _fetchPropertyReservations = _.memoize( async (propertyId, dispatch, getState) => {
    const response = await bnbwithme.get(`/properties/${propertyId}/reservations`, _userHeaders(getState))
    dispatch({type:FETCH_PROPERTY_RESERVATIONS, payload: humps(response.data)})
})

export const signIn = formProps => async dispatch => {
    const response = await bnbwithme.post('/users/sign_in', {user:formProps}) 
    // Decode User Data and combine with original response
    const userData = {...humps(response.data), jwt: response.headers.authorization}
    dispatch({type: SIGN_IN, payload: humps(userData)})
}

export const saveUserSession = () => (dispatch, getState, userSession=null) => {
    let currentUser = null
    if (userSession){
        currentUser = userSession
    }else{
        currentUser = getState().currentUser
    }
    localStorage.setItem('userSession', JSON.stringify( currentUser ) )
    dispatch({type: SAVE_USER_SESSION})
}

const revokeJwt = (jwt) => {
    bnbwithme.delete('/users/sign_out', _userHeaders(null, jwt))
} 

export const fetchNewJwt = () => async (dispatch, getState, jwt=null) => {
    let headers = null
    if(jwt){
        headers = _userHeaders(null, jwt)
    }else{
        headers = _userHeaders(getState)
    }
    const response = await bnbwithme.post('/users/sign_in', null, headers)
    const userData = {...humps(response.data), jwt: response.headers.authorization}
    revokeJwt(jwt)
    saveUserSession()(dispatch, getState, userData)
    dispatch({type: SIGN_IN, payload: humps(userData)})
}

export const signInFromLocalStorage = () => (dispatch, getState) => {
    const userSession = JSON.parse(localStorage.getItem('userSession'))
    // Ensures that there is actual data there. Eventually will check if data and jwt are valid.
    if(userSession){
        // Get expiration time from jwt
        const expiration = moment.unix( jwt.decode(userSession.jwt.substr(7)).exp )
        
        // If token expired, sign out. If not, get a new one
        if(expiration < moment()){
            signOut()(dispatch, getState)
        }else{
            fetchNewJwt()(dispatch, getState, userSession.jwt)
        }
        dispatch( {type: SIGN_IN_LOCAL_STORAGE, payload: userSession} )
    }
}

export const signOutFromLocalStorage = () => {
    localStorage.removeItem('userSession')
    return {type: 'SIGN_OUT_LOCAL_STORAGE'}
}

export const signOut = () => async (dispatch, getState) => {
    const response = await bnbwithme.delete('/users/sign_out', _userHeaders(getState))
    dispatch({type: SIGN_OUT, payload: response.data})
    signOutFromLocalStorage()
}

export const fetchUsers = () => async (dispatch, getState) => {
    const response = await bnbwithme.get('/people', _userHeaders(getState))
    dispatch({type: FETCH_USERS, payload: humps(response.data)})
}

export const fetchUser = id => async (dispatch, getState) => {
    const response = await bnbwithme.get(`/people/${id}`,  _userHeaders(getState))
    dispatch({type: FETCH_USER, payload: humps(response.data)})
}

export const createUser = (formValues, callback=null) => async (dispatch, getState) => {
    const response = await bnbwithme.post('/people', {user:dehumps(formValues)}, _userHeaders(getState))
    dispatch({type: FETCH_USER, payload: humps(response.data)})
    dispatch({type: CREATE_USER, payload: humps(response.data)})
    if(callback){
        callback()
    }
}

export const updateUser = (id, formValues, callback=null) => async (dispatch, getState) => {
    const response = await bnbwithme.put(`/people/${id}`, {user:dehumps(formValues)}, _userHeaders(getState))
    dispatch({type: FETCH_USER, payload: humps(response.data)})
    dispatch({type: UPDATE_USER, payload: humps(response.data)})
    if(callback){
        callback()
    }
}

export const destroyUser = (id, callback=null) => async (dispatch, getState) => {
    await bnbwithme.delete(`/people/${id}`, _userHeaders(getState))
    dispatch({type:DESTROY_USER, payload: id})
    if(callback){
        callback()
    }
}

export const assignCleanerToReservation = (id, cleanerId, callback = null) => async (dispatch, getState) => {
    const updatePayload = {reservation: {cleaner_id: cleanerId}}
    const response = await bnbwithme.put(`/properties/reservations/${id}`, updatePayload, _userHeaders(getState))

    dispatch({type: FETCH_RESERVATION, payload: humps(response.data)})

    // Do Callback:
    if(callback){
        callback()
    }

}

// Ical resource

export const fetchPropertyIcals = (propertyId) => async (dispatch, getState) => {
    const response = await bnbwithme.get(`/properties/${propertyId}/icals`, _userHeaders(getState))
    dispatch({type:FETCH_PROPERTY_ICALS, payload: humps(response.data)})
} 

export const fetchPropertyIcal = (propertyId, id) => async (dispatch, getState) => {
    const response = await bnbwithme.get(`/properties/${propertyId}/icals/${id}`, _userHeaders(getState))
    dispatch({type:FETCH_PROPERTY_ICAL, payload: humps(response.data)})
}

export const updatePropertyIcal = (propertyId, id, formValues, callback = null) => async (dispatch, getState) => {
    const response = await bnbwithme.put(`/properties/${propertyId}/icals/${id}`, dehumps({ical: formValues}), _userHeaders(getState))
    dispatch({type:UPDATE_PROPERTY_ICAL, payload: humps(response.data)})
    if(callback){
        callback()
    }
} 

export const destroyPropertyIcal = (propertyId, id, callback = null) => async (dispatch, getState) => {
    await bnbwithme.delete(`/properties/${propertyId}/icals/${id}`, _userHeaders(getState))
    dispatch({type:DESTROY_PROPERTY_ICAL, payload: {id, propertyId}})
    if(callback){
        callback()
    }
} 

export const createPropertyIcal = (propertyId, formValues, callback = null) => async (dispatch, getState) => {
    await bnbwithme.post(`/properties/${propertyId}/icals`, dehumps({ical: formValues}), _userHeaders(getState))
    dispatch({type:CREATE_PROPERTY_ICAL, payload: id})
    if(callback){
        callback()
    }
} 