import {FETCH_USERS, FETCH_USER, UPDATE_USER, DESTROY_USER, CREATE_USER} from '../actions/types'

export default (users={}, action) => {
    switch(action.type){
        case FETCH_USERS:
            action.payload.forEach((user)=> {
                users[user.id] = user
            })
            return {...users}
        case FETCH_USER:
            users[action.payload.id] = action.payload
            return {...users}
        case DESTROY_USER:
            delete users[action.payload]
            return {...users}
        default:
            return users
    }
}