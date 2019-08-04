import humps from 'lodash-humps'
import dehumps from 'snakecase-keys'
import bnbwithme from '../api/bnbwithme'
import {
    FETCH_REMINDERS,
    FETCH_REMINDER,
    UPDATE_REMINDER,
    CREATE_REMINDER,
    DESTROY_REMINDER,
    FETCH_REMINDER_OCCURENCES
} from './types'
import {_userHeaders, _encodeDate} from '.'

// /api/reminder

export const fetchReminders = (propertyId, start, end) => async (dispatch, getState) => {
    const response = await bnbwithme.get(`/properties/${propertyId}/reminders`, _userHeaders(getState))
    dispatch({type:FETCH_REMINDERS, payload: humps(response.data) })
} 

export const fetchReminder = (id, propertyId) => async (dispatch, getState) => {
    const response = await bnbwithme.get(`/properties/${propertyId}/reminders/${id}`, _userHeaders(getState))
    dispatch({type:FETCH_REMINDER, payload: humps(response.data)})
}

export const fetchReminderOccurences = (propertyId, jStart, jEnd) => async (dispatch, getState) => {
    const start = _encodeDate(jStart)
    const end = _encodeDate(jEnd)
    const response = await bnbwithme.get(`/properties/${propertyId}/emit_reminders`, {..._userHeaders(getState),params:{start, end}})
    dispatch({type:FETCH_REMINDER_OCCURENCES, payload: {data: humps(response.data), propertyId}})
}

export const updateReminder = (id, propertyId, formValues) => async (dispatch, getState) => {
    const response = await bnbwithme.put(`/properties/${propertyId}/reminders/${id}`, dehumps({reminder: formValues}) , _userHeaders(getState))
    dispatch({type:UPDATE_REMINDER, payload: humps(response.data)})
}

export const createReminder = (propertyId, formValues) => async (dispatch, getState) => {
    const response = await bnbwithme.post(`/properties/${propertyId}/reminders`, dehumps({reminder:formValues}), _userHeaders(getState))
    dispatch({type:CREATE_REMINDER, payload: humps(response.data)})
}

export const destroyReminder = (propertyId, id) => async(dispatch, getState) => {
    const response = await bnbwithme.delete(`/properties/${propertyId}/reminders/${id}`, _userHeaders(getState))
    dispatch({type: DESTROY_REMINDER, payload:{id}})
}