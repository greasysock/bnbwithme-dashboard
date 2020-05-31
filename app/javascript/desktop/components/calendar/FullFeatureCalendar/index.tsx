import * as React from 'react'
import { Calendar, momentLocalizer} from 'react-big-calendar'
import * as moment from 'moment'
import './sass/styles.scss'
import { Toolbar } from './Toolbar'
import { gql } from 'apollo-boost'
import { useQuery } from '@apollo/react-hooks'
import { MonthEvent, IMonthEventProps, EventType, MonthData, getMonthEventProps } from '../MonthEvent'

const localizer = momentLocalizer(moment)

const GET_RESERVATIONS = gql`
  query ($startDate: ISO8601Date!, $endDate: ISO8601Date!){
    reservations(startDate: $startDate, endDate: $endDate) {
      id,
      guest,
      start,
      end,
      email,
      phone,
      ical {
        service
      },
      property {
        id
        name
        color
      },
      cleanerId
    }
  }
`

interface dateRange {
  startDate: string
  endDate: string
}

const getDateRange = (date: moment.Moment):dateRange => {
  return {
    startDate: moment(date).startOf('month').subtract(7, 'days').toISOString(),
    endDate: moment(date).endOf('month').add(7, 'days').toISOString()
  }

}

export function FullFeatureCalendar () {

  const [currentDate, setCurrentDate] = React.useState<moment.Moment>(moment())
  const getReservations = useQuery(GET_RESERVATIONS, {variables: getDateRange(currentDate)})
  
  let reservations = []
  if(!getReservations.loading){
    reservations = getReservations.data.reservations
  }

  const renderEvents = ():MonthData[] => {
    const outEvents:MonthData[] = []

    // Create reservation events
    reservations.forEach(r=>outEvents.push({type:EventType.reservation, data: r, start: r.start, end: r.end}))
    // Create cleaning events
    reservations.forEach(r=>outEvents.push({type:EventType.cleaning, data: r, start: r.end, end: r.end}))
    // Create reminder events TODO
    return outEvents
  }

  console.log(getReservations.data)
  return (
    <Calendar
      date={currentDate.toDate()}
      onNavigate={(date)=>{
        setCurrentDate(moment(date))
      }}
      onSelectEvent={(e, i, o)=>console.log(i)}
      style={{'--height':'1600px'}}
      localizer={localizer}
      events={renderEvents()}
      views={['month']}
      eventPropGetter={getMonthEventProps}
      components={{
        toolbar: Toolbar,
        month: {
          event: MonthEvent
        }
      }}
    />
  )
}
