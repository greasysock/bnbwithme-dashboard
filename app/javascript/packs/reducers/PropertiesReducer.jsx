export default (properties={}, action) => {
    switch(action.type){
        case 'FETCH_PROPERTIES':
            action.payload.forEach((property)=>{properties[property.id] = property})
            return {...properties}
        default:
            return properties
    }
}