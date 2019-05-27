import humps from 'lodash-humps'
import dehumps from 'snakecase-keys'
import bnbwithme from '../api/bnbwithme'
import {
    FETCH_USERS,
    FETCH_USER,
    CREATE_USER,
    UPDATE_USER,
    DESTROY_USER,
} from './types'
import {_userHeaders} from '.'

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