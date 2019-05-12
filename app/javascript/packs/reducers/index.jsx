import {combineReducers} from 'redux'
import PropertiesReducer from './PropertiesReducer'
import ReservationsReducer from './ReservationsReducer'

export default combineReducers({
    properties: PropertiesReducer,
    reservations: ReservationsReducer
})