import React, {useState} from 'react'
import ReminderPopupForm from '../components/calendar/CreateReminder/ReminderPopupForm'

export const CalendarReminderFormContext = React.createContext()

export const CalendarReminderFormConsumer = CalendarReminderFormContext.Consumer

export const CalendarReminderFormProvider = ({children}) => {
  const [left, setLeft] = useState(0)
  const [top, setTop] = useState(0)
  const [active, setActive] = useState(false)
  const [dateRange, setDateRange] = useState()

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

  return (
    <CalendarReminderFormContext.Provider value={{
      open,
      close,
      left,
      top,
      active,
      dateRange,
      setDateRange
    }}>
      <ReminderPopupForm/>
      {children}
    </CalendarReminderFormContext.Provider>
  )
}