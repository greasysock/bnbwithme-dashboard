export const _userHeaders = (getState, jwt=null) => {
    if(jwt){
        return {headers: {'Authorization' : jwt} }
    }
    return { headers:  { 'Authorization': getState().currentUser.jwt } }
}

export const _encodeDate = (d) => {
    return d.format("DDMMYYYY")
}

export * from './propertiesActions'
export * from './reservationsActions'
export * from './propertyIcalsActions'
export * from './userSessionActions'
export * from './usersActions'
export * from './calendarSettingsActions'
export * from './reminderTypesActions'
export * from './remindersActions'