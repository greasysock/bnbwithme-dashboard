import {SIGN_IN, SIGN_OUT} from '../actions/types'

const INITIAL_STATE = {
    isSignedIn: false,
    userId: null,
    firstName: null,
    lastName: null,
    admin: false,
    cleaner: false,
    jwt: '',
    email: null
}

export default (state=INITIAL_STATE, action) => {
    switch(action.type){
        case SIGN_IN:
            const { email, jwt } = action.payload.session
            return { email, jwt, isSignedIn: true }
        case SIGN_OUT:
            return {...INITIAL_STATE}
        default:
            return state
    }
}