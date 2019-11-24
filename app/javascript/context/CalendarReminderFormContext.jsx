import React, {useState} from 'react'
import ReminderPopupForm from '../components/calendar/CreateReminder/ReminderPopupForm'

export const CalendarReminderFormContext = React.createContext()

export const CalendarReminderFormConsumer = CalendarReminderFormContext.Consumer

export const CalendarReminderFormProvider = ({children}) => {
  const [left, setLeft] = useState(0)
  const [top, setTop] = useState(0)
  const [active, setActive] = useState(false)

  const open = (l,t) => {
    setLeft(l)
    setTop(t)
    setActive(true)
  }

  const close = () => {
    setActive(false)
  }

  return (
    <CalendarReminderFormContext.Provider value={{
      open,
      close,
      left,
      top,
      active
    }}>
      <ReminderPopupForm/>
      {children}
    </CalendarReminderFormContext.Provider>
  )
}