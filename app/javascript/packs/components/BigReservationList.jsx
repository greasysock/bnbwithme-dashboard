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
    console.log(target.event)
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
            this.getEvents(res.data)
        })
    }

    eventPropGetter(event, start, end, isSelected){
        var style = {
            backgroundColor: event.color,
            borderRadius: '5px',
            color: 'white',
            border: '0px',
            display: 'block'        };
        return {
            style: style
        }
    }

    getEvents(properties) {
        properties.forEach((house) => {
            bnbwithme.get(`/properties/${house.id}/reservations.json`)
            .then(res => {
                let events = res.data.map(reservation => {
                    return {
                        title : `  ${house.name}`,
                        start : moment(reservation.start),
                        end : moment(reservation.end),
                        allDay: true,
                        color : `#${house.color}`,
                        service : reservation.service,
                        guest : reservation.guest
                    }
                })
                var joined = this.state.events.concat(events)
                this.setState({events:joined})
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