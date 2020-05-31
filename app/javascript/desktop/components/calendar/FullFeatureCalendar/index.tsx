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

const getHeight = (events = []) => { 
  // Create date map for date range and finds largest amount of events occuring in one day

  const dateMap = {}
  let largest = 0

  const findLargest = (value) => {
    if(value > largest){
      largest = value
    }
  }

  const addToDateMap = (d) => {
    if(dateMap[d.format('X')]){
      dateMap[d.format('X')] = dateMap[d.format('X')] + 1
    }else{
      dateMap[d.format('X')] = 1
    }
    findLargest(dateMap[d.format('X')])
  }
  events.forEach((event)=>{
    const start = moment(event.start)
    const end = moment(event.end)
    addToDateMap(start)
    while (start.format('X') !== end.format('X')){
      start.add(1, 'day')
      addToDateMap(start)
    }
  })

  if(largest === 0){largest = 30}

  // Row length is 5, event height is 20px including 1px for spacing

  return (largest * 5 * 20 + ( 5 * 50)) + 180
}

const getDateRange = (date: moment.Moment):dateRange => {
  return {
    startDate: moment(date).startOf('month').subtract(7, 'days').toISOString(),
    endDate: moment(date).endOf('month').add(7, 'days').toISOString()
  }

}

export function FullFeatureCalendar () {

  const [ currentDate, setCurrentDate ] = React.useState<moment.Moment>(moment())
  const getReservations = useQuery(GET_RESERVATIONS, {variables: getDateRange(currentDate)})

  const reservations = React.useMemo(() => {
    if(getReservations.loading) return []
    return getReservations.data.reservations
  }, [getReservations])

  const { reservationEvents, cleaningEvents } = React.useMemo(()=>{
    const reservationEvents:MonthData[] = []
    const cleaningEvents:MonthData[] = []

    // Create reservation events
    reservations.forEach(r=>reservationEvents.push({type:EventType.reservation, data: r, start: r.start, end: r.end}))
    // Create cleaning events
    reservations.forEach(r=>cleaningEvents.push({type:EventType.cleaning, data: r, start: r.end, end: r.end}))

    return { reservationEvents, cleaningEvents }
  }, [reservations])

  const events = React.useMemo(():MonthData[] => [...reservationEvents, ...cleaningEvents], [reservationEvents, cleaningEvents])

  const height = React.useMemo(() => getHeight(events), [ events ])

  return (
    <Calendar
      date={currentDate.toDate()}
      onNavigate={(date)=>{
        setCurrentDate(moment(date))
      }}
      onSelectEvent={(e, i, o)=>console.log(i)}
      style={{'--height':`${height}px`}}
      localizer={localizer}
      events={events}
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
