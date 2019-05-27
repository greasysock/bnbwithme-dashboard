import humps from 'lodash-humps'
import dehumps from 'snakecase-keys'
import bnbwithme from '../api/bnbwithme'
import {
    FETCH_PROPERTIES,
    UPDATE_PROPERTY,
    CREATE_PROPERTY,
    DESTROY_PROPERTY,
    FETCH_PROPERTY,
} from './types'
import {_userHeaders} from '.'


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
