import _ from 'lodash'
import jwt from 'jsonwebtoken'
import humps from 'lodash-humps'
import dehumps from 'snakecase-keys'

import bnbwithme from '../api/bnbwithme'
import {
    FETCH_PROPERTIES,
    UPDATE_PROPERTY,
    CREATE_PROPERTY,
    DESTROY_PROPERTY,
    FETCH_PROPERTY,
    FETCH_PROPERTY_RESERVATIONS,
    FETCH_RESERVATION,
    SIGN_IN, 
    SIGN_OUT,
    ASSIGN_CLEANER_TO_RESERVATION,
    REMOVE_CLEANER_FROM_RESERVATION,
    FETCH_USERS,
    FETCH_USER
} from './types'

const _userHeaders = (getState) => {
    return { headers:  { 'Authorization': `Bearer ${getState().currentUser.jwt}` } }
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
    const response = await bnbwithme.post('/user/session', formProps)
    // Decode User Data and combine with original response
    const userData = {...response.data.session, ...jwt.decode(response.data.session.jwt)}
    dispatch({type: SIGN_IN, payload: humps(userData)})
}

export const signOut = () => async (dispatch, getState) => {
    const response = await bnbwithme.delete('/user/session/a', _userHeaders(getState))
    dispatch({type: SIGN_OUT, payload: response.data})
}

export const fetchUsers = () => async (dispatch, getState) => {
    const response = await bnbwithme.get('/users', _userHeaders(getState))
    dispatch({type: FETCH_USERS, payload: humps(response.data)})
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