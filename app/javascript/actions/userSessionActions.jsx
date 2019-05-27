import humps from 'lodash-humps'
import moment from 'moment'
import jwt from 'jsonwebtoken'
import bnbwithme from '../api/bnbwithme'
import {
    SIGN_IN, 
    SIGN_OUT,
    SAVE_USER_SESSION,

    SIGN_IN_LOCAL_STORAGE
} from './types'
import {_userHeaders} from '.'

export const signIn = formProps => async dispatch => {
    const response = await bnbwithme.post('/users/sign_in', {user:formProps}) 
    // Decode User Data and combine with original response
    const userData = {...humps(response.data), jwt: response.headers.authorization}
    dispatch({type: SIGN_IN, payload: humps(userData)})
}

export const saveUserSession = () => (dispatch, getState, userSession=null) => {
    let currentUser = null
    if (userSession){
        currentUser = userSession
    }else{
        currentUser = getState().currentUser
    }
    localStorage.setItem('userSession', JSON.stringify( currentUser ) )
    dispatch({type: SAVE_USER_SESSION})
}

const revokeJwt = (jwt) => {
    bnbwithme.delete('/users/sign_out', _userHeaders(null, jwt))
} 

export const fetchNewJwt = () => async (dispatch, getState, jwt=null) => {
    let headers = null
    if(jwt){
        headers = _userHeaders(null, jwt)
    }else{
        headers = _userHeaders(getState)
    }
    const response = await bnbwithme.post('/users/sign_in', null, headers)
    const userData = {...humps(response.data), jwt: response.headers.authorization}
    revokeJwt(jwt)
    saveUserSession()(dispatch, getState, userData)
    dispatch({type: SIGN_IN, payload: humps(userData)})
}

export const signInFromLocalStorage = () => (dispatch, getState) => {
    const userSession = JSON.parse(localStorage.getItem('userSession'))
    // Ensures that there is actual data there. Eventually will check if data and jwt are valid.
    if(userSession){
        // Get expiration time from jwt
        const expiration = moment.unix( jwt.decode(userSession.jwt.substr(7)).exp )
        
        // If token expired, sign out. If not, get a new one
        if(expiration < moment()){
            signOut()(dispatch, getState)
        }else{
            fetchNewJwt()(dispatch, getState, userSession.jwt)
        }
        dispatch( {type: SIGN_IN_LOCAL_STORAGE, payload: userSession} )
    }
}

export const signOutFromLocalStorage = () => {
    localStorage.removeItem('userSession')
    return {type: 'SIGN_OUT_LOCAL_STORAGE'}
}

export const signOut = () => async (dispatch, getState) => {
    const response = await bnbwithme.delete('/users/sign_out', _userHeaders(getState))
    dispatch({type: SIGN_OUT, payload: response.data})
    signOutFromLocalStorage()
}
