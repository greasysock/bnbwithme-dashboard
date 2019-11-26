import React, {useState} from 'react'
import {useDispatch} from 'react-redux'
import ReminderPopupForm from '../components/calendar/CreateReminder/ReminderPopupForm'
import {createReminderType, fetchReminderOccurences} from '../actions'
import moment from 'moment'

export const CalendarReminderFormContext = React.createContext()

export const CalendarReminderFormConsumer = CalendarReminderFormContext.Consumer

export const CalendarReminderFormProvider = ({children}) => {
  const [left, setLeft] = useState(0)
  const [top, setTop] = useState(0)
  const [active, setActive] = useState(false)
  const [dateRange, setDateRange] = useState({start:moment(), end: moment()})
  const [icon, setIcon] = useState('exclamation')
  const [name, setName] = useState()
  const [propertyId, setPropertyId] = useState()
  const [recurrenceType, setRecurrenceType] = useState()
  const dispatch = useDispatch()

  const open = (l,t, config={}) => {
    const {start, end} = config
    setLeft(l)
    setTop(t)
    setActive(true)
    if(start&&end){
      setDateRange({
        start,end
      })
    }
  }

  const close = () => {
    setActive(false)
    setDateRange()
  }

  const submit = () => {
    const composition = {
      name,
      symbol: 'fa-'+icon,
      reminders_attributes: [
        {
          property_id: propertyId,
          start: dateRange.start.format(),
          end: dateRange.end.format(),
          full_day: true
        }
      ]
    }

    dispatch(createReminderType(composition))
    fetchReminderOccurences(propertyId, moment().subtract(1,  'month'), moment().add(1, 'month'))
  }
 
  return (
    <CalendarReminderFormContext.Provider value={{
      open,
      close,
      submit,
      left,
      top,
      active,
      dateRange,
      setDateRange,
      icon, setIcon,
      name, setName,
      propertyId, setPropertyId,
      recurrenceType, setRecurrenceType
    }}>
      <ReminderPopupForm/>
      {children}
    </CalendarReminderFormContext.Provider>
  )
}