import _ from 'lodash'
import bnbwithme from '../api/bnbwithme'

export const fetchPropertiesAndReservations = () => async (dispatch, getState) => {
    await dispatch(fetchProperties())
    const propertyIds = _.map(getState().properties, 'id')
    propertyIds.forEach(id=>dispatch(fetchPropertyReservations(id)))
}

export const fetchProperties = () => async (dispatch) => {
    const response = await bnbwithme.get('/properties.json')
    dispatch({type:'FETCH_PROPERTIES', payload: response.data})
}

export const fetchPropertyReservations = propertyId => async (dispatch) => {
    const response = await bnbwithme.get(`/properties/${propertyId}/reservations.json`)
    dispatch({type:'FETCH_PROPERTY_RESERVATIONS', payload: response.data})
}