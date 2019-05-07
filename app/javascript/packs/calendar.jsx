import React from 'react'
import ReactDom from 'react-dom'
import BigReservationList from "./components/BigReservationList"

class CalendarCard extends React.Component {
    render() {
      return (
        <BigReservationList/>
      )
    }
}

ReactDom.render(<CalendarCard/>, document.getElementById("calendar"))