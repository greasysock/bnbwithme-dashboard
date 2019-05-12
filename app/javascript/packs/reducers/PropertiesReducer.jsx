export default (properties=[], action) => {
    switch(action.type){
        case 'FETCH_PROPERTIES':
            return action.payload
        default:
            return properties
    }
}