import React from 'react'
import FullCalendar from '@fullcalendar/react'
import datGridPlugin from '@fullcalendar/daygrid'

export default class DemoApp extends React.Component {

    render() {
      return (
        <FullCalendar defaultView="dayGridMonth" plugins={[ dayGridPlugin ]} />
      )
    }
  
  }