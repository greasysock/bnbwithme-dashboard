import {SIGN_IN, SIGN_OUT} from '../actions/types'

const INITIAL_STATE = {
    isSignedIn: false,
    userId: null,
    firstName: null,
    lastName: null,
    admin: false,
    cleaner: false
}

export default (state=INITIAL_STATE, action) => {
    switch(action.type){
        default:
            return state
    }
}