import {FETCH_USERS} from '../actions/types'

export default (users={}, action) => {
    switch(action.type){
        case FETCH_USERS:
            action.payload.forEach((user)=> {
                users[user.id] = user
            })
            return {...users}
        default:
            return users
    }
}