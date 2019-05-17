import {SIGN_OUT, FETCH_PROPERTIES} from '../actions/types'

export default (properties={}, action) => {
    switch(action.type){
        case FETCH_PROPERTIES:
            action.payload.forEach((property)=>{properties[property.id] = property})
            return {...properties}
        case SIGN_OUT:
            return {}
        default:
            return properties
    }
}