import _ from 'lodash'
import bnbwithme from '../api/bnbwithme'

export const fetchPropertiesAndReservations = () => async (dispatch, getState) => {
    await dispatch(fetchProperties())
    const propertyIds = _.map(getState().properties, 'id')
    const promises = []
    propertyIds.forEach(id=>promises.push(dispatch(fetchPropertyReservations(id))))
    await Promise.all(promises)
}

export const fetchProperties = () => async (dispatch) => {
    const response = await bnbwithme.get('/properties.json')
    dispatch({type:'FETCH_PROPERTIES', payload: response.data})
}

export const fetchPropertyReservations = propertyId => dispatch => _fetchPropertyReservations(propertyId, dispatch)

const _fetchPropertyReservations = _.memoize( async (propertyId, dispatch) => {
    const response = await bnbwithme.get(`/properties/${propertyId}/reservations.json`)
    const out = {
        data : response.data,
        propertyId
    }
    dispatch({type:'FETCH_PROPERTY_RESERVATIONS', payload: out})
}) 