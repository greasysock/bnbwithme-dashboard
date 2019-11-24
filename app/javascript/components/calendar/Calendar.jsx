import React, {useState} from 'react'
import BigReservationList from './BigReservationList'
import {CalendarReminderFormProvider} from '../../context'

const Calendar = () => {
  const [height, setHeight] = useState(280)
  return (
    <div style={{ background: '#fff', padding: 12, minHeight: height}}>
      <CalendarReminderFormProvider>
        <BigReservationList setContainerHeight={(h)=>setHeight(h+90)}/>
      </CalendarReminderFormProvider>
    </div>
  )
}

export default Calendar