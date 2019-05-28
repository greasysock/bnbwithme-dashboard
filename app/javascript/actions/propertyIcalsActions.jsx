import humps from 'lodash-humps'
import dehumps from 'snakecase-keys'
import bnbwithme from '../api/bnbwithme'
import {
    FETCH_PROPERTY_ICALS,
    FETCH_PROPERTY_ICAL,
    UPDATE_PROPERTY_ICAL,
    CREATE_PROPERTY_ICAL,
    DESTROY_PROPERTY_ICAL,
} from './types'
import {_userHeaders} from '.'

export const fetchPropertyIcals = (propertyId) => async (dispatch, getState) => {
    const response = await bnbwithme.get(`/properties/${propertyId}/icals`, _userHeaders(getState))
    dispatch({type:FETCH_PROPERTY_ICALS, payload: {icals:humps(response.data), propertyId} })
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
    const response = await bnbwithme.post(`/properties/${propertyId}/icals`, dehumps({ical: formValues}), _userHeaders(getState))
    dispatch({type:CREATE_PROPERTY_ICAL, payload: humps(response.data)})
    if(callback){
        callback()
    }
} 