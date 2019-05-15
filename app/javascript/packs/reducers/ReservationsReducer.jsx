export default (reservations={}, action) => {
    switch(action.type){
        case 'FETCH_PROPERTY_RESERVATIONS':
            const newReservations = {}
            Object.assign(newReservations, reservations)
            action.payload.forEach((reservation)=>{newReservations[reservation.id]=reservation})
            return newReservations
        default:
            return reservations
    }
}