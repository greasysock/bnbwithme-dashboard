import React from 'react'
import ReactDom from 'react-dom'
import ReservationList from "./components/ReservationList"

class CalendarCard extends React.Component {
    render() {
      return (
        <ReservationList/>
      )
    }
}

ReactDom.render(<CalendarCard/>, document.getElementById("calendar"))