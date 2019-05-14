import _ from 'lodash'
import bnbwithme from '../api/bnbwithme'
import {FETCH_PROPERTIES, FETCH_PROPERTY_RESERVATIONS, SIGN_IN, SIGN_OUT} from './types'

export const fetchPropertiesAndReservations = () => async (dispatch, getState) => {
    await dispatch(fetchProperties())
    const propertyIds = _.map(getState().properties, 'id')
    const promises = []
    propertyIds.forEach(id=>promises.push(dispatch(fetchPropertyReservations(id))))
    await Promise.all(promises)
}

export const fetchProperties = () => async (dispatch) => {
    const response = await bnbwithme.get('/properties')
    dispatch({type:FETCH_PROPERTIES, payload: response.data})
}

export const fetchPropertyReservations = propertyId => dispatch => _fetchPropertyReservations(propertyId, dispatch)

const _fetchPropertyReservations = _.memoize( async (propertyId, dispatch) => {
    const response = await bnbwithme.get(`/properties/${propertyId}/reservations`)
    const out = {
        data : response.data,
        propertyId
    }
    dispatch({type:FETCH_PROPERTY_RESERVATIONS, payload: out})
})

export const signIn = formProps => async dispatch => {
    const response = await bnbwithme.post('/users/sign_in', formProps)
    console.log(formProps)
    dispatch({type: SIGN_IN, payload: response.data})
}

export const signOut = () => async dispatch => {
    const response = await bnbwithme.delete('/users/sign_out')
    dispatch({type: SIGN_OUT, payload: response.data})
}