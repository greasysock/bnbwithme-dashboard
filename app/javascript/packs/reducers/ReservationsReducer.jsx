export default (reservations={}, action) => {
    switch(action.type){
        case 'FETCH_PROPERTY_RESERVATIONS':
            const newReservations = {}
            Object.assign(newReservations, reservations)
            newReservations[action.payload.propertyId] = action.payload.data
            return newReservations
        default:
            return reservations
    }
}