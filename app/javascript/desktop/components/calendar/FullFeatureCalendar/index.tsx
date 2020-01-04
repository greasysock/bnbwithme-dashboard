import * as React from 'react'
import { Calendar, momentLocalizer} from 'react-big-calendar'
import * as moment from 'moment'
import './sass/styles.scss'
import { Toolbar } from './Toolbar'

const localizer = momentLocalizer(moment)

export interface IFullFeatureCalendarProps {
}

export function FullFeatureCalendar (props: IFullFeatureCalendarProps) {
  return (
    <Calendar
      localizer={localizer}
      events={[]}
      views={['month']}
      components={{
        toolbar: Toolbar
      }}
    />
  )
}
