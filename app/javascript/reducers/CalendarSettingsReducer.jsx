import {
    TOGGLE_RESERVATIONS,
    TOGGLE_CLEANINGS,
    ADD_PROPERTY_TO_FILTER,
    TOGGLE_REMINDERS,
    SET_SELECTED_MONTH
} from '../actions/types'

const renderCurrent = (d) => {
    const renderMonth = () => {
        if(d.getMonth() > 8){
            return d.getMonth() + 1
        }
        return `0${d.getMonth() + 1}`
        }
    return `${renderMonth()}${d.getFullYear()}`
} 

const DEFAULT_STATE = {
    showReservations: true,
    showCleanings: false,
    showReminders: true,
    propertyFilters: [],
    selectedMonth: renderCurrent(new Date())
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
        case SET_SELECTED_MONTH:
            calendarSettings.selectedMonth = renderCurrent(action.payload)
        default:

            return {...DEFAULT_STATE, ...calendarSettings}
    }
}