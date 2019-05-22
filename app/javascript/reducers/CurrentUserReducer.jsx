import {SIGN_IN, SIGN_OUT, SIGN_IN_LOCAL_STORAGE} from '../actions/types'

const INITIAL_STATE = {
    isSignedIn: false,
    userId: null,
    firstName: null,
    lastName: null,
    admin: false,
    cleaner: false,
    jwt: null,
    email: null,
    authToken: null
}

export default (state=INITIAL_STATE, action) => {
    switch(action.type){
        case SIGN_IN:
            return { ...action.payload, isSignedIn: true }
        case SIGN_OUT:
            return {...INITIAL_STATE}
        case SIGN_IN_LOCAL_STORAGE:
            return action.payload
        default:
            return state
    }
}