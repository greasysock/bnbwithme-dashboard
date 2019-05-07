import React from 'react'
import BigCalendar from 'react-big-calendar'
import moment from 'moment'
import bnbwithme from '../api/bnbwithme'
import 'react-big-calendar/lib/css/react-big-calendar.css'

const localizer = BigCalendar.momentLocalizer(moment)

function getServiceIcon(service) {
    switch(service){
        case 'airbnb':
        return "icon-airbnb"
        case 'vrbo':
        return "icon-vrbo"
    }
}

function MonthEvent(target){
    return (
        <div>
            <i className={getServiceIcon(target.event.service)}/>
            {target.event.title} - <b>{target.event.guest}</b>
        </div>
    )
}


export default class BigReservationList extends React.Component{
    state = {
        events: [],
        properties: []
    }

    getProperties() {
        bnbwithme.get('/properties.json')
        .then((res) => {
            this.setState({
                properties: res.data
            })
            this.getEvents()
        })
    }

    eventPropGetter(event, start, end, isSelected){
        var style = {
            backgroundColor: event.color,
            borderRadius: '0px',
            color: 'white',
            border: '0px',
            display: 'block'        };
        return {
            style: style
        }
    }

    getEvents() {
        this.state.properties.forEach((house) => {
            bnbwithme.get(`/properties/${house.id}/reservations.json`)
            .then((res) => {
                res.data.forEach((reservation) => {
                    let e = {
                        title : `  ${house.name}`,
                        start : new Date(reservation.start),
                        end : new Date(reservation.end),
                        color : `#${house.color}`,
                        service : reservation.service,
                        guest : reservation.guest
                    }
                    this.setState({
                        events: [...this.state.events, e]
                    })
                    }
                )
            })
        })
    }

    componentDidMount(){
        this.getProperties()
    }

    render() {
        return (
            <BigCalendar
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