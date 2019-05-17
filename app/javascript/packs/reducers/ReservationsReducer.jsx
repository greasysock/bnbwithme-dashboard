import {FETCH_PROPERTY_RESERVATIONS, SIGN_OUT, FETCH_RESERVATION} from '../actions/types'

export default (reservations={}, action) => {
    switch(action.type){
        case FETCH_PROPERTY_RESERVATIONS:
            const newReservations = {}
            Object.assign(newReservations, reservations)
            action.payload.forEach((reservation)=>{newReservations[reservation.id]=reservation})
            return newReservations
        case FETCH_RESERVATION:
            reservations[action.payload.id] = action.payload
            return {...reservations}
        case SIGN_OUT:
            return {}
        default:
            return reservations
    }
}