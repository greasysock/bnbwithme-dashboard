import {FETCH_REMINDERS,
    FETCH_REMINDER,
    CREATE_REMINDER,
    UPDATE_REMINDER,
    DESTROY_REMINDER} from '../actions/types'

export default (Reminders = {}, action) => {
switch(action.type){
    case FETCH_REMINDERS:
        const reminders = {}
        action.payload.forEach((reminder)=>{reminders[reminder.id]=reminder})
        return {...reminderTypes}
    case DESTROY_REMINDER:
        delete Reminders[action.payload.id]
        return {...Reminders}
    case FETCH_REMINDER:
        Reminders[action.payload.id] = action.payload
        return {...Reminders}
    case UPDATE_REMINDER:
        Reminders[action.payload.id] = action.payload
        return {...Reminders}
    case CREATE_REMINDER:
        Reminders[action.payload.id] = action.payload
        return {...Reminders}
    default:
        return Reminders
}
}