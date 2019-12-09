import * as React from 'react'
import {Helmet} from 'react-helmet-async'

const CalednarHeader = () => {
  return (
    <Helmet>
      <title>Calendar</title>
    </Helmet>
  )
}

const Calendar = () => {
  return (
    <>
    <CalednarHeader/>
    <div>Hello</div>
    </>
   );
}
 
export default Calendar;