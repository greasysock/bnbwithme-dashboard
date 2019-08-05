import React, {useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {Tag} from 'antd'

import {fetchReminderType} from '../actions'

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

export const ReminderIcon = (props) => {
    return <i className={`fa ${props.symbol}`}/>
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
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch( fetchReminderType(props.reminderTypeId) )
    }, [])
    const reminderType = useSelector(state => state.reminderTypes[props.reminderTypeId])
    const property = useSelector(state => state.properties[props.propertyId])

    if(!reminderType){
        return <b>Loading...</b>
    }

    return (
        <div>
            <ReminderIcon symbol={reminderType.symbol}/> {property.name} - <b>{reminderType.name}</b>
        </div>
    )
}

export function MonthEvent(target){
    switch(target.event.eventType){
        case EventTypeEnum.REMINDER:
            return (
                <ReminderEvent {...target.event}/>
            )
        case EventTypeEnum.RESERVATION:
            break
    }
    if (!target.event.cleaning){
        return (
            <div>
                <ServiceIcon service={target.event.service}/>
                {target.event.title} - <b>{target.event.guest}</b> <CleanerWarning cleanerId={target.event.cleanerId}/>
            </div>
        )
    }
    return (
        <div>
                <ServiceIcon service ={target.event.service}/>
                {target.event.title} - <CleanerName cleaner={target.event.cleaner}/>
        </div>
    )

}