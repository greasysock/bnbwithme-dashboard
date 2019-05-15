import _ from 'lodash'
import bnbwithme from '../api/bnbwithme'
import {FETCH_PROPERTIES, FETCH_PROPERTY_RESERVATIONS, SIGN_IN, SIGN_OUT} from './types'

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
    dispatch({type:FETCH_PROPERTIES, payload: response.data})
}

export const fetchPropertyReservations = propertyId => (dispatch, getState) => _fetchPropertyReservations(propertyId, dispatch, getState)

const _fetchPropertyReservations = _.memoize( async (propertyId, dispatch, getState) => {
    const response = await bnbwithme.get(`/properties/${propertyId}/reservations`, _userHeaders(getState))
    const out = {
        data : response.data,
        propertyId
    }
    dispatch({type:FETCH_PROPERTY_RESERVATIONS, payload: out})
})

export const signIn = formProps => async dispatch => {
    const response = await bnbwithme.post('/user/session', formProps)
    console.log(response)
    dispatch({type: SIGN_IN, payload: response.data})
}

export const signOut = () => async (dispatch, getState) => {
    const response = await bnbwithme.delete('/user/session/a', _userHeaders(getState))
    dispatch({type: SIGN_OUT, payload: response.data})
}