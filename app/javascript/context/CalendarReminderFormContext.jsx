import React, {useState} from 'react'
import {useDispatch} from 'react-redux'
import ReminderPopupForm from '../components/calendar/CreateReminder/ReminderPopupForm'
import {createReminderType, fetchReminderOccurences} from '../actions'
import moment from 'moment'

export const CalendarReminderFormContext = React.createContext()

export const CalendarReminderFormConsumer = CalendarReminderFormContext.Consumer

const useName = () => {
  const [name, setName] = useState()
  let nameValid = false
  if(name && name.length > 0 && name.length <= 255){
    nameValid = true
  }
  return {name, setName, nameValid}
}

const useDate = () => {
  const [dateRange, setDateRange] = useState({start:moment(), end: moment()})
  let dateValid = false
  if(dateRange.start >= moment().startOf('day') && dateRange.end >= moment().startOf('day')){
    dateValid = true
  }
  return {dateRange, setDateRange, dateValid}
}

const useIcon = () => {
  const defaultIcon = 'exclamation'
  const [icon, setIcon] = useState(defaultIcon)
  let iconValid = false
  if(icon){
    iconValid = true
  }
  return {icon, setIcon, iconValid}
}

const usePropertyId = () => {
  const [propertyId, setPropertyId] = useState()
  let propertyIdValid = false
  if(propertyId){
    propertyIdValid = true
  }
  return {propertyId, setPropertyId, propertyIdValid}
}

const useRecurrenceType = () => {
  const [reccurenceType, setRecurrenceType] = useState()
  const recurrenceTypeValid = true
  return {reccurenceType, setRecurrenceType, recurrenceTypeValid}
}

export const CalendarReminderFormProvider = ({children}) => {
  const [left, setLeft] = useState(0)
  const [top, setTop] = useState(0)
  const [active, setActive] = useState(false)
  const {dateRange, setDateRange, dateValid} = useDate()
  const {icon, setIcon, iconValid} = useIcon()
  const {name, setName, nameValid} = useName()
  const {propertyId, setPropertyId, propertyIdValid} = usePropertyId()
  const {recurrenceType, setRecurrenceType, recurrenceTypeValid} = useRecurrenceType()
  const dispatch = useDispatch()
  const valid = dateValid && iconValid && nameValid && propertyIdValid && recurrenceTypeValid

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
    setDateRange({start:moment(), end: moment()})
    setIcon('exclamation')
    setName()
    setPropertyId()
    setRecurrenceType()
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

    const onSuccess = () => {
      dispatch(fetchReminderOccurences(propertyId, moment().subtract(1,'month'), moment().add(1, 'month')))
      close()
    }

    dispatch(createReminderType(composition, onSuccess))
  }
 
  return (
    <CalendarReminderFormContext.Provider value={{
      open,
      close,
      submit,
      left,
      top,
      active,
      valid,
      dateProps: {dateRange, setDateRange},
      iconProps: {icon, setIcon},
      nameProps: {name, setName},
      propertyIdProps: {propertyId, setPropertyId},
      recurrenceTypeProps: {recurrenceType, setRecurrenceType}
    }}>
      <ReminderPopupForm/>
      {children}
    </CalendarReminderFormContext.Provider>
  )
}