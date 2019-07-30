import humps from 'lodash-humps'
import _ from 'lodash'
import bnbwithme from '../api/bnbwithme'

import {
    FETCH_PROPERTY_RESERVATIONS,
    FETCH_RESERVATION,
    ASSIGN_CLEANER_TO_RESERVATION,
    REMOVE_CLEANER_FROM_RESERVATION,
} from './types'

import {_userHeaders, _encodeDate} from '.'
import {fetchProperties} from './propertiesActions'

export const fetchPropertiesAndReservations = () => async (dispatch, getState) => {
    await dispatch(fetchProperties())
    const propertyIds = _.map(getState().properties, 'id')
    const promises = []
    propertyIds.forEach(id=>promises.push(dispatch(fetchPropertyReservations(id))))
    await Promise.all(promises)
}

export const fetchPropertyReservations = (propertyId, start, end) => async (dispatch, getState) => {
    const params = {}
    if(start && end){
        params.start = _encodeDate(start)
        params.end = _encodeDate(end)
    }
    const response = await bnbwithme.get(`/properties/${propertyId}/reservations`, {..._userHeaders(getState), params:params})
    dispatch({type:FETCH_PROPERTY_RESERVATIONS, payload: humps(response.data)})
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