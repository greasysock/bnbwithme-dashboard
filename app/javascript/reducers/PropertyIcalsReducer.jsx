import {FETCH_PROPERTY_ICALS,
        FETCH_PROPERTY_ICAL,
        CREATE_PROPERTY_ICAL,
        UPDATE_PROPERTY_ICAL,
        DESTROY_PROPERTY_ICAL} from '../actions/types'

export default (Icals = {}, action) => {
    switch(action.type){
        case FETCH_PROPERTY_ICALS:
            const propertyIcals = {}
            action.payload.icals.forEach((Ical)=>{propertyIcals[Ical.id] = Ical})
            Icals[action.payload.propertyId] = propertyIcals
            return {...Icals}
        case DESTROY_PROPERTY_ICAL:
            delete Icals[action.payload.propertyId][action.payload.id]
            return {...Icals}
        case FETCH_PROPERTY_ICAL:
            Icals[action.payload.id] = action.payload
            return {...Icals}
        case UPDATE_PROPERTY_ICAL:
            Icals[action.payload.id] = action.payload
            return {...Icals}
        case CREATE_PROPERTY_ICAL:
            Icals[action.payload.id] = action.payload
            return {...Icals}
        default:
            return Icals
    }
}