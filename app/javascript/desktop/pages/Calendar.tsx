import * as React from 'react'
import {Helmet} from 'react-helmet-async'
import { Paper } from '@material-ui/core'
import { FullFeatureCalendar } from '../components/calendar/FullFeatureCalendar'

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
    <Paper>
      <FullFeatureCalendar/>
    </Paper>
    </>
   );
}
 
export default Calendar;