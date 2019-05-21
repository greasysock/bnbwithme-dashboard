import {combineReducers} from 'redux'
import { reducer as formReducer } from 'redux-form'
import PropertiesReducer from './PropertiesReducer'
import ReservationsReducer from './ReservationsReducer'
import CurrentUserReducer from './CurrentUserReducer'
import UsersReducer from './UsersReducer'

export default combineReducers({
    properties: PropertiesReducer,
    reservations: ReservationsReducer,
    form: formReducer,
    currentUser: CurrentUserReducer,
    users: UsersReducer
})