import {FETCH_REMINDER_OCCURENCES} from '../actions/types'

export default (ReminderOccurences = {}, action) => {
switch(action.type){
    case FETCH_REMINDER_OCCURENCES:
        const reminderOccurences = {}
        reminderOccurences[action.payload.propertyId] = action.payload.data
        return {...ReminderOccurences, ...reminderOccurences}
    default:
        return ReminderOccurences
}
}