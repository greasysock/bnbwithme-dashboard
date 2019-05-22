import {SIGN_OUT, FETCH_PROPERTIES, CREATE_PROPERTY, UPDATE_PROPERTY, DESTROY_PROPERTY} from '../actions/types'

export default (properties={}, action) => {
    switch(action.type){
        case FETCH_PROPERTIES:
            action.payload.forEach((property)=>{properties[property.id] = property})
            return {...properties}
        case CREATE_PROPERTY:
            properties[action.payload.id] = action.payload
            return {...properties}
        case UPDATE_PROPERTY:
            properties[action.payload.id] = action.payload
            return {...properties}
        case DESTROY_PROPERTY:
            delete properties[action.payload]
            return {...properties}
        case SIGN_OUT:
            return {}
        default:
            return properties
    }
}