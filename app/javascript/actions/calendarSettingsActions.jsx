import {
    TOGGLE_CLEANINGS,
    TOGGLE_RESERVATIONS,
    ADD_PROPERTY_TO_FILTER,
    TOGGLE_REMINDERS,
    SET_SELECTED_MONTH
} from './types'

export const toggleReservations = () => {
    return {type: TOGGLE_RESERVATIONS}
}
export const toggleCleanings = () => {
    return {type: TOGGLE_CLEANINGS}
}
export const toggleReminders = () => {
    return {type: TOGGLE_REMINDERS}
}
export const addPropertyToFilter = (properties) => {
    return {type: ADD_PROPERTY_TO_FILTER, payload: properties}
}
export const setSelectedMonth = (date) => {
    return {type: SET_SELECTED_MONTH, payload: date}
}