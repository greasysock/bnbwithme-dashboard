import React from 'react'
import ReactDom from 'react-dom'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import bootstrapPlugin from '@fullcalendar/bootstrap';
import { Card, Button } from "tabler-react"
import "tabler-react/dist/Tabler.css"

import '@fullcalendar/core/main.css';
import '@fullcalendar/bootstrap/main.css';
import '@fullcalendar/daygrid/main.css';

export default class EventCalendar extends React.Component {

    render() {
        return (
          <FullCalendar defaultView="dayGridMonth" 
            plugins={[ dayGridPlugin, bootstrapPlugin ]}
            events={[
            { title: 'event 1', date: '2019-04-01' },
            { title: 'event 2', date: '2019-04-02' },
            { title: 'event 1', date: '2019-04-01' },
            { title: 'event 2', date: '2019-04-02' },
            { title: 'event 1', date: '2019-04-01' },
            { title: 'event 2', date: '2019-04-02' },
            { title: 'event 1', date: '2019-04-01' },
            { title: 'event 2', date: '2019-04-02' },
            { title: 'event 1', date: '2019-04-01' },
            { title: 'event 2', date: '2019-04-02' },
            { title: 'event 1', date: '2019-04-01' },
            { title: 'event 2', date: '2019-04-02' },
            { title: 'event 1', date: '2019-04-01' },
            { title: 'event 2', date: '2019-04-02' },
            { title: 'event 1', date: '2019-04-01' },
            { title: 'event 2', date: '2019-04-02' },
            { title: 'event 1', date: '2019-04-01' },
            { title: 'event 2', date: '2019-04-02' },
            { title: 'event 1', date: '2019-04-01' },
            { title: 'event 2', date: '2019-04-02' },
            { title: 'event 1', date: '2019-04-01' },
            { title: 'event 2', date: '2019-04-02' },
            { title: 'event 1', date: '2019-04-01' },
            { title: 'event 2', date: '2019-04-02' }
            ]}
            themeSystem="bootstrap"
            />
        )
      }
  
  }

  class CalendarCard extends React.Component {
    render() {
      return (
        <Card>
          <Card.Header>
            <Card.Title>Reservation Calendar</Card.Title>
          </Card.Header>
          <Card.Body>
            <EventCalendar/>
          </Card.Body>
        </Card>
      )
    }
  }

  $(document).on('turbolinks:load', ReactDom.render(<CalendarCard/>, document.getElementById("calendar")) );