import React from 'react'
import { connect } from 'react-redux'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css'

import {MonthEvent, EventTypeEnum} from '../../helpers/calendarHelpers'
import Toolbar from './BigCalendarToolbar/BigCalendarToolbar'
import ReservationDrawer from './Drawers/ReservationDrawer'
import {fetchPropertiesAndReservations, setSelectedMonth, fetchProperties, fetchReminderOccurences, fetchPropertyReservations} from '../../actions'
import '../../styles/logofonts.css'
import './styles/month.less'

const localizer = momentLocalizer(moment)

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
        height: 400,
        randoHeight: 6
    }

    eventPropGetter(event, start, end, isSelected){
        console.log(event)
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
        const propsHeight = Object.keys(this.props.properties).length * 160
        const {showReservations, showCleanings} = this.props.calendarSettings
        if (showReservations){finalHeight += propsHeight}
        if (showCleanings){finalHeight += propsHeight}
        this.genRandoHeight()
        this.setState({height:finalHeight + 450 })
    }

    genRandoHeight = () => {
        // Generate array of numbers between 1-10 excluding current number
        const numArr = []
        var j = 0
        for(var i = 1; i < 10; i++){
            if(i!==this.state.randoHeight){
                numArr[j] = i
                j++
            }
        }
        const randIndex = Math.floor(Math.random() * 8)
        this.setState({randoHeight:numArr[randIndex]})

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
                cleanerId : reservation.cleanerId,
                eventType: EventTypeEnum.RESERVATION
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
                cleaner,
                eventType: EventTypeEnum.CLEANING
            }
        })
        return events
    }

    getReminders = () => {
        const events = []
        Object.values(this.props.properties).forEach((property)=>{
            if(this.props.reminderOccurences[property.id]){
                this.props.reminderOccurences[property.id].forEach((reminderOccurence)=> {
                    events.push({
                        eventType: EventTypeEnum.REMINDER,
                        propertyId: property.id,
                        reminderTypeId: reminderOccurence.reminderTypeId,
                        start: moment(reminderOccurence.start),
                        end: moment(reminderOccurence.end),
                        title: 'reminder',
                        allDay: true,
                        color: '#000',
                        cleaning: true,
                        service: 'vrbo',
                        guest: 'test',
                        id: 1
                    })
                })
            }
        })
        return events
    }

    getEvents = () => {
        const events = []
        const {showReservations, showCleanings, showReminders} = this.props.calendarSettings
        if(showReservations){
            this.getReservations().forEach((reservation)=>events.push(reservation))
        }
        if(showCleanings){
            this.getCleanings().forEach((cleaning)=>{events.push(cleaning)})
        }
        if(showReminders){
            this.getReminders().forEach((reminder)=>{events.push(reminder)})
        }
        console.log(events)

        return events
    }

    onHandleSelectEvent = (event) => {
        this.setState({
            showReservationDrawer: true,
            selectedReservation: event.id
        })
    }

    componentDidMount(){
        this.props.fetchProperties().then(()=>{
            this.prepareReservationsAndCleanings()
            this.prepareReminders()
        })
    }

    getStartEnd(){
        const start = moment(this.props.calendarSettings.selectedMonth)
        const end = moment(this.props.calendarSettings.selectedMonth)
        start.subtract(1, 'month')
        end.add(1, 'month')
        return {start, end}
    }

    // Populate entire stores without regard to active properties
    prepareReservationsAndCleanings() {
        const {showReservations, showCleanings} = this.props.calendarSettings

        if((showReservations || showCleanings)&&this.props.properties){
            const {start, end} = this.getStartEnd()
            Promise.all(Object.values(this.props.properties).map((p)=>{
                return this.props.fetchPropertyReservations(p.id, start, end)
            })).then(()=>{this.getHeight()})
        }
    }
    // Grab all reminders and their recurrences for active properties
    prepareReminders() {
        const {showReminders} = this.props.calendarSettings
        if(showReminders){
            const {start,end} = this.getStartEnd()
            Object.values(this.props.properties).forEach((p)=>{
                this.props.fetchReminderOccurences(p.id, start, end)
            })
            this.getHeight()
    
        }
    }

    componentDidUpdate(prevProps){
        const {showReservations, showCleanings, showReminders, selectedMonth} = this.props.calendarSettings
        const {calendarSettings} = prevProps
        const dateUpdated = () => {
            return selectedMonth.format('X') !== calendarSettings.selectedMonth.format('X')
        }
        if((showReservations !== calendarSettings.showReservations) || (showCleanings !== calendarSettings.showCleanings) || dateUpdated()){
            this.prepareReservationsAndCleanings()
        }
        if((showReminders !== calendarSettings.showReminders) || dateUpdated()){
            this.prepareReminders()
        }
    }

    getNavigate = (date) => {
        this.props.setSelectedMonth(date)
    }

    render() {
        return (
            <div>
                <Calendar
                    style={{height: this.state.height}}
                    localizer={localizer}
                    startAccessor="start"
                    endAccessor="end"
                    tooltipAccessor={null}
                    views={['month']}
                    events={this.getEvents()}
                    eventPropGetter={this.eventPropGetter}
                    onSelectEvent={this.onHandleSelectEvent}
                    date={this.props.calendarSettings.selectedMonth.toDate()}
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
    return moment(`13${d}`, "DDMMYYYY")
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
            if(state.properties[propertyFilter]){
                properties[propertyFilter] = state.properties[propertyFilter]
            }
            if(state.reminderOccurences[propertyFilter]){
                reminderOccurences[propertyFilter] = state.reminderOccurences[propertyFilter]
            }
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

export default connect(mapStateToProps, {
    fetchPropertiesAndReservations, 
    setSelectedMonth, 
    fetchProperties,
    fetchReminderOccurences,
    fetchPropertyReservations
})(BigReservationList)