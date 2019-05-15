import React from 'react'
import { connect } from 'react-redux'
import BigCalendar from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css'

import ReservationDrawer from './ReservationDrawer'
import {fetchPropertiesAndReservations} from '../../actions'
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
        height: 600,
        selectedReservation: null,
        showReservationDrawer: false
    }

    setupReservations() {
        this.setHeight()
        this.getEvents()
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

    setHeight = () => {
        this.setState({
            height: (Object.keys(this.props.properties).length * 30 * 5) + 450
        })
    }

    getEvents = () => {
        const events = Object.values(this.props.reservations).map((reservation) => {
            const house = this.props.properties[reservation.propertyId]

            return {
                title : `  ${house.name}`,
                start : moment(reservation.start),
                end : moment(reservation.end),
                allDay: true,
                color : `#${house.color}`,
                service : reservation.service,
                guest : reservation.guest,
                phone : reservation.phone,
                id : reservation.id,
                propertyId : house.id
            }
        })
        this.setState({events})
    }

    onHandleSelectEvent = (event) => {
        this.setState({
            showReservationDrawer: true,
            selectedReservation: event.id
        })
    }

    componentDidMount(){
        this.props.fetchPropertiesAndReservations().then(()=>{
            this.setupReservations()
        })
        }

    render() {
        return (
            <div>
                <BigCalendar
                    style={{height: `${this.state.height}px`}}
                    localizer={localizer}
                    startAccessor="start"
                    endAccessor="end"
                    events={this.state.events}
                    eventPropGetter={this.eventPropGetter}
                    onSelectEvent={this.onHandleSelectEvent}
                    components={{
                        month: {event:MonthEvent}
                    }}
                />
                <ReservationDrawer onDrawerClose={()=>this.setState({showReservationDrawer:false})} visible={this.state.showReservationDrawer} reservationId={this.state.selectedReservation}/>
            </div>
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