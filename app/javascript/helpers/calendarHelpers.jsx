import React, {useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faBroom} from '@fortawesome/free-solid-svg-icons'
import {fetchReminderType} from '../actions'
import {useFontAwesome, useReminderType} from '../hooks'

const ServiceIconWrap = (props) => {
    return <i style={props.style} className={props.name}/>
}

export var EventTypeEnum = {
    RESERVATION: 1,
    CLEANING: 2,
    REMINDER: 3
}

export const ServiceIcon = (props) => {
    switch(props.service){
        case 'airbnb':
        return <ServiceIconWrap style={props.style} name="icon-airbnb"/>
        case 'vrbo':
        return <ServiceIconWrap name= "icon-vrbo"/>
    }
}

export function CleanerWarning(props){
    if(!props.cleanerId){
        return <span className="cleaner-warning">No Cleaner</span>
    }
    return null
}

export function CleanerName(props){
    if(props.cleaner){
        return <b>{`${props.cleaner.firstName} ${props.cleaner.lastName}`}</b>
    }
    return <CleanerWarning/>
}

const ReminderEvent = (props) => {
    const reminderType = useReminderType(props.reminderTypeId)
    const property = useSelector(state => state.properties[props.propertyId])

    if(!reminderType){
        return <b>Loading...</b>
    }

    return (
        <div>
            <FontAwesomeIcon icon={reminderType.icon}/> <b>{reminderType.name}</b> - {property.name}
        </div>
    )
}

const ReservationEvent = (props) => {
    const property = useSelector(state => state.properties[props.propertyId])
    const reservation = useSelector(state => state.reservations[props.id])
    return (
        <div>
            <ServiceIcon service={reservation.service}/>
            {property.name} - <b>{reservation.guest}</b> <CleanerWarning cleanerId={reservation.cleanerId}/>
        </div>
    )
}

const CleaningEvent = (props) => {
    const property = useSelector(state => state.properties[props.propertyId])
    const reservation = useSelector(state => state.reservations[props.id])
    const cleaner = useSelector(state => state.users[reservation.cleanerId])
    return (
        <div>
            <FontAwesomeIcon icon={faBroom}/>
            {" "}{property.name} - <CleanerName cleaner={cleaner}/>
        </div>
    )
}

export function MonthEvent(target){
    switch(target.event.eventType){
        case EventTypeEnum.REMINDER:
            return (
                <ReminderEvent {...target.event}/>
            )
        case EventTypeEnum.CLEANING:
            return (
                <CleaningEvent {...target.event}/>
            )
        case EventTypeEnum.RESERVATION:
            return (
                <ReservationEvent {...target.event}/>
            )
    }
}