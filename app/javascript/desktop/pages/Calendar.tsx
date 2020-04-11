import * as React from 'react'
import {Helmet} from 'react-helmet-async'
import { Paper } from '@material-ui/core'
import { FullFeatureCalendar } from '../components/calendar/FullFeatureCalendar'

const CalendarHeader = () => {
  return (
    <Helmet>
      <title>Calendar</title>
    </Helmet>
  )
}

const Calendar = () => {
  return (
    <>
    <CalendarHeader/>
    <Paper>
      <FullFeatureCalendar/>
    </Paper>
    </>
   );
}
 
export default Calendar;