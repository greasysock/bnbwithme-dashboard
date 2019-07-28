import {
    TOGGLE_RESERVATIONS,
    TOGGLE_CLEANINGS,
    ADD_PROPERTY_TO_FILTER,
    TOGGLE_REMINDERS
} from '../actions/types'

const DEFAULT_STATE = {
    showReservations: true,
    showCleanings: false,
    showReminders: true,
    propertyFilters: []
}

export default (calendarSettings = DEFAULT_STATE, action) => {
    switch(action.type){
        case TOGGLE_RESERVATIONS:
            calendarSettings.showReservations = !calendarSettings.showReservations
            return {...calendarSettings}
        case TOGGLE_CLEANINGS:
            calendarSettings.showCleanings = !calendarSettings.showCleanings
            return {...calendarSettings}
        case TOGGLE_REMINDERS:
            calendarSettings.showReminders = !calendarSettings.showReminders
            return {...calendarSettings}
        case ADD_PROPERTY_TO_FILTER:
            calendarSettings.propertyFilters = action.payload
            return {...calendarSettings}
        default:

            return {...DEFAULT_STATE, ...calendarSettings}
    }
}