import React from 'react'
import axios from 'axios'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import bootstrapPlugin from '@fullcalendar/bootstrap';
import { Dimmer } from "tabler-react"
import "tabler-react/dist/Tabler.css"
import '@fullcalendar/core/main.css';
import '@fullcalendar/bootstrap/main.css';
import '@fullcalendar/daygrid/main.css';
import '@fortawesome/fontawesome-free/css/all.css'

const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}  

export default class ReservationList extends React.Component {
    state = {
        Properties: [],
        ready: false
    }

    calendarRef = React.createRef()

    componentDidMount() {
        this.getProperties()
    }

    getProperties() {
        axios.get('/properties.json')
        .then((res) => {
            this.setState({
                Properties: res.data
            })
            this.getEvents()
        })
    }

    getEvents() {
        this.state.Properties.forEach((house) => {
            axios.get(`/properties/${house.id}/reservations.json`)
            .then((res) => {
                res.data.forEach((reservation) => {
                    let calendarApi = this.calendarRef.current.getApi()
                    calendarApi.addEvent({
                        title : `  ${house.name} - `,
                        start : reservation.start,
                        end : reservation.end,
                        color : `#${house.color}`,
                        extendedProps : {
                            service : reservation.service,
                            guest : reservation.guest
                        }
                    })
                })
            })
        })
        sleep(600).then(()=>{
            this.setState({
                ready: true
            })
        })
    }

    getServiceIcon(service) {
        switch(service){
            case 'airbnb':
            return "fa fa-airbnb"
            case 'vrbo':
            return "fa fa-concierge-bell"
        }
    }

    handleEventRender(calendar, element) {
        if(calendar.event.extendedProps.service){
            let icon = ""
            switch(calendar.event.extendedProps.service){
                case 'airbnb':
                icon = "icon-airbnb"
                break
                case 'vrbo':
                icon = "icon-vrbo"
            }
    
            $(calendar.el).find(".fc-title").prepend(`<i class='${icon}'></i>`)
        }
        if(calendar.event.extendedProps.guest) {
            $(calendar.el).find(".fc-title").append(`<small class=\"\"><strong> ${calendar.event.extendedProps.guest}</strong></small>`)
        }
    }

    render() {
        console.log(this.state.ready)
        return (
            <Dimmer active={!this.state.ready} loader>
                <FullCalendar defaultView="dayGridMonth" 
                plugins={[ dayGridPlugin, bootstrapPlugin ]}
                contentHeight="auto"
                themeSystem="bootstrap"
                ref={this.calendarRef}
                eventRender={this.handleEventRender}
                />
            </Dimmer>
        )
    }
}