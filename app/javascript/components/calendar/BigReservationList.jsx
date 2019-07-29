import React from 'react'
import { connect } from 'react-redux'
import BigCalendar from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css'

import {MonthEvent} from '../../helpers/calendarHelpers'
import Toolbar from './BigCalendarToolbar/BigCalendarToolbar'
import ReservationDrawer from './Drawers/ReservationDrawer'
import {fetchPropertiesAndReservations, setSelectedMonth} from '../../actions'
import '../../styles/logofonts.css'
import './styles/month.less'

const localizer = BigCalendar.momentLocalizer(moment)

const colToInt = (value) =>{
    return parseInt( "0x" + value )
}

const floatToCol = (value) => {
    if(value>255){
        return "FF"
    }else if(value<0){
        return "00"
    }
    return Math.round(value).toString(16)
}

const darken = (color, amount) => {
    let r = color.slice(1,3)
    let g = color.slice(3,5)
    let b = color.slice(5,7)
    const darkenIndividual = (channel) => {
        return floatToCol( colToInt(channel) - amount )
    }
    return `#${darkenIndividual(r)}${darkenIndividual(g)}${darkenIndividual(b)}`
}

class BigReservationList extends React.Component{

    state = {
        selectedReservation: null,
        showReservationDrawer: false,
    }

    eventPropGetter(event, start, end, isSelected){
        var style = {
            padding: '0px 4px',
            position: 'relative',
            fontSize: 13,
            borderRadius: 4,
            backgroundColor: event.color,
            fontFamily: 'Circular, -apple-system, BlinkMacSystemFont, Roboto, Helvetica Neue, sans-serif'

        }
        if(!event.cleaning){
            style.color = 'white'
        }else{
            if(event.cleanerId){
                style.backgroundColor = 'black'
                style.color = "white"
            }else{
                style.backgroundColor = 'white'
                style.color = "black"
                style.boxSizing = "border-box"
                style.border = "1px solid #CCC"
        }

        }

        return {
            style: style
        }
    }

    getHeight = () => {
        let finalHeight = 0
        const propsHeight = Object.keys(this.props.properties).length * 140
        const {showReservations, showCleanings} = this.props.calendarSettings
        if (showReservations){finalHeight += propsHeight}
        if (showCleanings){finalHeight += propsHeight}
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
        const {showReservations, showCleanings} = this.props.calendarSettings
        if(showReservations){
            this.getReservations().forEach((reservation)=>events.push(reservation))
        }
        if(showCleanings){
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

    componentDidMount(){
        this.prepareReservationsAndCleanings()
        this.prepareReminders()
        }

    // Populate entire stores without regard to active properties
    prepareReservationsAndCleanings() {
        const {showReservations, showCleanings} = this.props.calendarSettings

        if(showReservations || showCleanings){
            this.props.fetchPropertiesAndReservations()
        }
    }
    // Grab all reminders and their recurrences for active properties
    prepareReminders() {
        const {showReminders} = this.props.calendarSettings
        if(showReminders){
            Object.values(this.props.properties).forEach((p)=>{

            })
        }
    }
    componentDidUpdate(prevProps){
        const {showReservations, showCleanings, showReminders} = this.props.calendarSettings
        const {calendarSettings} = prevProps
        if((showReservations !== calendarSettings.showReservations) || (showCleanings !== calendarSettings.showCleanings)){
            this.prepareReservationsAndCleanings()
        }
        if(showReminders !== calendarSettings.showReminders){
            this.prepareReminders()
        }
    }
    getCurrentView = () => {
        const {selectedMonth} = this.props.calendarSettings
        return selectedMonth
    }
    getNavigate = (date) => {
        this.props.setSelectedMonth(date)
    }

    render() {
        return (
            <div>
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
                    date={this.getCurrentView()}
                    components={{
                        month: {event:MonthEvent},
                        toolbar: Toolbar
                    }}
                    onNavigate={this.getNavigate}
                />
                <ReservationDrawer onDrawerClose={()=>this.setState({showReservationDrawer:false, selectedReservation: null})} visible={this.state.showReservationDrawer} reservationId={this.state.selectedReservation}/>
            </div>
        )
    }
}

const decodeDate = (d) => {
    const month = Number(d.slice(0,2))-1
    const year = Number(d.slice(2,6))
    const dd = new Date()
    dd.setDate(13)
    dd.setMonth(month)
    dd.setYear(year)
    return dd
}

const mapStateToProps = (state) => {
    const props = {
        users:state.users,
        calendarSettings: {...state.calendarSettings}
    }
    props.calendarSettings.selectedMonth = decodeDate(props.calendarSettings.selectedMonth)
    if(state.calendarSettings.propertyFilters.length === 0){
        return {
            ...props,
            properties:state.properties,
            reservations:state.reservations,
            reminderOccurences:state.reminderOccurences
           
        }
    }else {
        const {propertyFilters} = state.calendarSettings
        const properties = {}
        const reservations = {}
        const reminderOccurences = {}
        const propertyFilterMap = {}
        propertyFilters.forEach((propertyFilter)=>{
            properties[propertyFilter] = state.properties[propertyFilter]
            reminderOccurences[propertyFilter] = state.reminderOccurences[propertyFilter]
            propertyFilterMap[propertyFilter] = true
        })
        Object.values(state.reservations).forEach((r)=>{
            if(propertyFilterMap[r.propertyId]){
                reservations[r.id] = r
            }
        })
        return {
            ...props,
            properties,
            reminderOccurences,
            reservations
        }
    }
}

export default connect(mapStateToProps, {fetchPropertiesAndReservations, setSelectedMonth})(BigReservationList)