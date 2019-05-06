import React from 'react'
import ReactDom from 'react-dom'
import ReservationList from "./components/ReservationList"
import '@fullcalendar/core/main.css';
import '@fullcalendar/bootstrap/main.css';
import '@fullcalendar/daygrid/main.css';

class CalendarCard extends React.Component {
    render() {
      return (
        <ReservationList/>
      )
    }
}

ReactDom.render(<CalendarCard/>, document.getElementById("calendar"))