import {
    TOGGLE_RESERVATIONS,
    TOGGLE_CLEANINGS
} from '../actions/types'

const DEFAULT_STATE = {
    showReservations: true,
    showCleanings: false
}

export default (calendarSettings = DEFAULT_STATE, action) => {
    switch(action.type){
        case TOGGLE_RESERVATIONS:
            calendarSettings.showReservations = !calendarSettings.showReservations
            return {...calendarSettings}
        case TOGGLE_CLEANINGS:
            calendarSettings.showCleanings = !calendarSettings.showCleanings
            return {...calendarSettings}
        default:
            return calendarSettings
    }
}