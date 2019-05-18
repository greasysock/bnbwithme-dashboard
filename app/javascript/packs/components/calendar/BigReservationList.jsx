import React from 'react'
import { connect } from 'react-redux'
import BigCalendar from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css'

import {MonthEvent} from '../../helpers/calendarHelpers'
import Toolbar from './BigCalendarToolbar/BigCalendarToolbar'
import ReservationDrawer from './Drawers/ReservationDrawer'
import {fetchPropertiesAndReservations} from '../../actions'
import CalendarSettings, {CalendarSetting} from './CalendarSettings/CalendarSettings'
import '../../styles/logofonts.css'

const localizer = BigCalendar.momentLocalizer(moment)

class BigReservationList extends React.Component{

    state = {
        selectedReservation: null,
        showReservationDrawer: false,
        showReservations: true,
        showCleanings: false
    }

    eventPropGetter(event, start, end, isSelected){
        var style = {
            borderRadius: '5px',
            color: 'white',
            border: '0px',
            display: 'block'
        }
        if(!event.cleaning){
            style.backgroundColor = event.color
        }else{
            if(event.cleanerId){
                style.backgroundColor = "black"
            }else{
                style.backgroundColor = "white"
                style.border = "2px solid black"
                style.color = "black"
        }

        }

        return {
            style: style
        }
    }

    getHeight = () => {
        let finalHeight = 0
        const propsHeight = Object.keys(this.props.properties).length * 150
        if (this.state.showReservations){finalHeight += propsHeight}
        if (this.state.showCleanings){finalHeight += propsHeight}
        return finalHeight + 450
    }

    getReservations = () => {
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
                propertyId : house.id,
                cleanerId : reservation.cleanerId
            }
        })
        return events
    }

    getCleanings = () => {
        const events = Object.values(this.props.reservations).map((reservation) => {
            const house = this.props.properties[reservation.propertyId]
            const cleaner = this.props.users[reservation.cleanerId]
            return {
                title : `  ${house.name}`,
                start : moment(reservation.end).subtract(1, "days"),
                end : moment(reservation.end).subtract(1, "days"),
                allDay: true,
                color : `#000`,
                service : reservation.service,
                guest : reservation.guest,
                phone : reservation.phone,
                id : reservation.id,
                propertyId : house.id,
                cleanerId : reservation.cleanerId,
                cleaning : true,
                cleaner
            }
        })
        return events
    }

    getEvents = () => {
        const events = []
        if(this.state.showReservations){
            this.getReservations().forEach((reservation)=>events.push(reservation))
        }
        if(this.state.showCleanings){
            this.getCleanings().forEach((cleaning)=>{events.push(cleaning)})
        }
        return events
    }

    onHandleSelectEvent = (event) => {
        this.setState({
            showReservationDrawer: true,
            selectedReservation: event.id
        })
    }

    handleCalendarControl = (control, C) => {
        switch(control){
            case 'Reservations':
                this.setState({showReservations:C})
                break
            case 'Cleanings':
                this.setState({showCleanings:C})
        }
    }

    calendarControls = () => {
        return(
            <>
                <CalendarSetting onSwitch={this.handleCalendarControl} switchState={this.state.showReservations} name="Reservations"/>
                <CalendarSetting onSwitch={this.handleCalendarControl} switchState={this.state.showCleanings} name="Cleanings"/>
            </>
        )
    }

    componentDidMount(){
        this.props.fetchPropertiesAndReservations()
        }

    render() {
        return (
            <div>
                <CalendarSettings controls={this.calendarControls}/>
                <BigCalendar
                    style={{height: `${this.getHeight()}px`}}
                    localizer={localizer}
                    startAccessor="start"
                    endAccessor="end"
                    tooltipAccessor={null}
                    views={['month']}
                    events={this.getEvents()}
                    eventPropGetter={this.eventPropGetter}
                    onSelectEvent={this.onHandleSelectEvent}
                    components={{
                        month: {event:MonthEvent},
                        toolbar: Toolbar
                    }}
                />
                <ReservationDrawer onDrawerClose={()=>this.setState({showReservationDrawer:false, selectedReservation: null})} visible={this.state.showReservationDrawer} reservationId={this.state.selectedReservation}/>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        properties:state.properties,
        reservations:state.reservations,
        users:state.users
    }
}

export default connect(mapStateToProps, {fetchPropertiesAndReservations})(BigReservationList)