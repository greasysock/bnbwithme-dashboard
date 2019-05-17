import React from 'react'
import { connect } from 'react-redux'
import BigCalendar from 'react-big-calendar'
import MonthView from 'react-big-calendar/lib/Month'
import moment from 'moment'
import {Tag, Button} from 'antd'
import 'react-big-calendar/lib/css/react-big-calendar.css'

import Toolbar from './BigCalendarToolbar'
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

function CleanerWarning(props){
    if(!props.cleanerId){
        return <Tag color="red">No Cleaner</Tag>
    }
    return null
}

function MonthEvent(target){
    return (
        <div>
            <i className={getServiceIcon(target.event.service)}/>
            {target.event.title} - <b>{target.event.guest}</b> <CleanerWarning cleanerId={target.event.cleanerId}/>
        </div>
    )
}

class BigReservationList extends React.Component{

    state = {
        selectedReservation: null,
        showReservationDrawer: false
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

    getHeight = () => {
        return (Object.keys(this.props.properties).length * 30 * 5) + 450
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
                propertyId : house.id,
                cleanerId : reservation.cleanerId
            }
        })
        return events
    }

    onHandleSelectEvent = (event) => {
        this.setState({
            showReservationDrawer: true,
            selectedReservation: event.id
        })
    }

    componentDidMount(){
        this.props.fetchPropertiesAndReservations()
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
        reservations:state.reservations
    }
}

export default connect(mapStateToProps, {fetchPropertiesAndReservations})(BigReservationList)