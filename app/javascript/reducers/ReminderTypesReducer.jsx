import {FETCH_REMINDER_TYPES,
    FETCH_REMINDER_TYPE,
    CREATE_REMINDER_TYPE,
    UPDATE_REMINDER_TYPE,
    DESTROY_REMINDER_TYPE} from '../actions/types'

export default (ReminderTypes = {}, action) => {
switch(action.type){
    case FETCH_REMINDER_TYPES:
        const reminderTypes = {}
        action.payload.forEach((reminderType)=>{reminderTypes[reminderType.id]=reminderType})
        return {...reminderTypes}
    case DESTROY_REMINDER_TYPE:
        delete ReminderTypes[action.payload.id]
        return {...ReminderTypes}
    case FETCH_REMINDER_TYPE:
        ReminderTypes[action.payload.id] = action.payload
        return {...ReminderTypes}
    case UPDATE_REMINDER_TYPE:
        ReminderTypes[action.payload.id] = action.payload
        return {...ReminderTypes}
    case CREATE_REMINDER_TYPE:
        ReminderTypes[action.payload.id] = action.payload
        return {...ReminderTypes}
    default:
        return ReminderTypes
}
}