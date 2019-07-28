import {FETCH_REMINDER_OCCURENCES} from '../actions/types'

export default (ReminderOccurences = {}, action) => {
switch(action.type){
    case FETCH_REMINDER_OCCURENCES:
        const reminderOccurences = {}
        //action.payload.forEach((reminderOccurence)=>{reminderOccurences[reminderType.id]=reminderType})
        return {...reminderOccurences}
    default:
        return ReminderOccurences
}
}