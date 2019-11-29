import humps from 'lodash-humps'
import dehumps from 'snakecase-keys'
import bnbwithme from '../api/bnbwithme'
import {
    FETCH_REMINDER_TYPES,
    FETCH_REMINDER_TYPE,
    UPDATE_REMINDER_TYPE,
    CREATE_REMINDER_TYPE,
    DESTROY_REMINDER_TYPE,
} from './types'
import {_userHeaders} from '.'

// /api/reminder_types

export const fetchReminderTypes = () => async (dispatch, getState) => {
    const response = await bnbwithme.get(`/reminder_types`, _userHeaders(getState))
    dispatch({type:FETCH_REMINDER_TYPES, payload: humps(response.data) })
} 

export const fetchReminderType = (id) => async (dispatch, getState) => {
    const response = await bnbwithme.get(`/reminder_types/${id}`, _userHeaders(getState))
    dispatch({type:FETCH_REMINDER_TYPE, payload: humps(response.data)})
}

export const updateReminderType = (id, formValues) => async (dispatch, getState) => {
    const response = await bnbwithme.put(`/reminder_types/${id}`, dehumps({reminder_type: formValues}) , _userHeaders(getState))
    dispatch({type:UPDATE_REMINDER_TYPE, payload: humps(response.data)})
}

export const createReminderType = (formValues, onSuccess=()=>null, onFailure=()=>null) => async (dispatch, getState) => {
    const response = await bnbwithme.post('/reminder_types', dehumps({reminder_type:formValues}), _userHeaders(getState))
    onSuccess()
    dispatch({type:CREATE_REMINDER_TYPE, payload: humps(response.data)})
}

export const destroyReminderType = (id) => async(dispatch, getState) => {
    const response = await bnbwithme.delete(`/reminder_types/${id}`, _userHeaders(getState))
    dispatch({type: DESTROY_REMINDER_TYPE, payload:{id}})
}