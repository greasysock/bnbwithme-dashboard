import {
    TOGGLE_CLEANINGS,
    TOGGLE_RESERVATIONS
} from './types'

export const toggleReservations = () => {
    return {type: TOGGLE_RESERVATIONS}
}
export const toggleCleanings = () => {
    return {type: TOGGLE_CLEANINGS}
}