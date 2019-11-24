import React, {useState} from 'react'
import BigReservationList from './BigReservationList'

const Calendar = () => {
  const [height, setHeight] = useState(280)
  return (
    <div style={{ background: '#fff', padding: 12, minHeight: height}}>
      <BigReservationList setContainerHeight={(h)=>setHeight(h+90)}/>
    </div>
  )
}

export default Calendar