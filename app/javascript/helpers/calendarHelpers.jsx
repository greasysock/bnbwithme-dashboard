import React from 'react'
import {Tag} from 'antd'

const ServiceIconWrap = (props) => {
    return <i style={props.style} className={props.name}/>
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

export function MonthEvent(target){
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