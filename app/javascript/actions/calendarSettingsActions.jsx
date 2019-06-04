import {
    TOGGLE_CLEANINGS,
    TOGGLE_RESERVATIONS,
    ADD_PROPERTY_TO_FILTER
} from './types'

export const toggleReservations = () => {
    return {type: TOGGLE_RESERVATIONS}
}
export const toggleCleanings = () => {
    return {type: TOGGLE_CLEANINGS}
}
export const addPropertyToFilter = (properties) => {
    return {type: ADD_PROPERTY_TO_FILTER, payload: properties}
}