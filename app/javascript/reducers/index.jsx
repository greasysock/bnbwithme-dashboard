import {combineReducers} from 'redux'
import { reducer as formReducer } from 'redux-form'
import PropertiesReducer from './PropertiesReducer'
import ReservationsReducer from './ReservationsReducer'
import CurrentUserReducer from './CurrentUserReducer'
import UsersReducer from './UsersReducer'
import PropertyIcalsReducer from './PropertyIcalsReducer'
import CalendarSettingsReducer from './CalendarSettingsReducer'
import ReminderTypesReducer from './ReminderTypesReducer'
import RemindersReducer from './RemindersReducer'
import ReminderOccurencesReducer from './ReminderOcurrencesReducer'

export default combineReducers({
    properties: PropertiesReducer,
    propertyIcals: PropertyIcalsReducer,
    reservations: ReservationsReducer,
    form: formReducer,
    currentUser: CurrentUserReducer,
    users: UsersReducer,
    calendarSettings: CalendarSettingsReducer,
    reminderTypes: ReminderTypesReducer,
    reminders: RemindersReducer,
    reminderOccurences: ReminderOccurencesReducer
})