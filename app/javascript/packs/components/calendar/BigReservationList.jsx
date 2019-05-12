import React from 'react'
import { connect } from 'react-redux'
import BigCalendar from 'react-big-calendar'
import moment from 'moment'
import {fetchPropertiesAndReservations} from '../../actions'
import bnbwithme from '../../api/bnbwithme'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import '../../styles/logofonts.css'

const localizer = BigCalendar.momentLocalizer(moment)

function getServiceIcon(service) {
    switch(service){
        case 'airbnb':
        return "icon-airbnb"
        case 'vrbo':
        return "icon-vrbo"
    }
}

function GuestPhone(props){
    if(!props.phone){
        return null
    }
    return (
        <div style={{display: "inline"}}> - <i className="fa fa-phone"/> {props.phone}</div>
    )
}

function MonthEvent(target){
    return (
        <div>
            <i className={getServiceIcon(target.event.service)}/>
            {target.event.title} - <b>{target.event.guest}</b>
        </div>
    )
}


class BigReservationList extends React.Component{
    state = {
        events: [],
        height: 600
    }

    setupReservations() {
        this.setHeight(this.props.properties)
        this.getEvents(this.props.properties)
    }

    eventPropGetter(event, start, end, isSelected){
        var style = {
            backgroundColor: event.color,
            borderRadius: '5px',
            color: 'white',
            border: '0px',
            display: 'block'    
        }
        return {
            style: style
        }
    }

    setHeight(properties) {
        this.setState({
            height: (properties.length * 30 * 5) + 450
        })
    }

    getEvents(properties) {
        properties.forEach((house) => {
            const events = this.props.reservations[house.id].map(reservation => {
                return {
                    title : `  ${house.name}`,
                    start : moment(reservation.start),
                    end : moment(reservation.end),
                    allDay: true,
                    color : `#${house.color}`,
                    service : reservation.service,
                    guest : reservation.guest,
                    phone : reservation.phone
                }
            })
            var joined = this.state.events.concat(events)
            this.setState({events:joined})
        })
    }

    componentDidMount(){
        this.props.fetchPropertiesAndReservations().then(()=>{
            this.setupReservations()
        })
        }

    render() {
        return (
            <BigCalendar
                style={{height: `${this.state.height}px`}}
                localizer={localizer}
                startAccessor="start"
                endAccessor="end"
                events={this.state.events}
                eventPropGetter={this.eventPropGetter}
                components={{
                    month: {event:MonthEvent}
                }}
            />
        )
    }
}

const mapStateToProps = (state) => {
    return {
        properties:state.properties,
        reservations:state.reservations
    }
}

export default connect(mapStateToProps, {fetchPropertiesAndReservations})(BigReservationList)