import React, {useContext, useRef, useState} from 'react'
import {useSelector} from 'react-redux'
import {Input, Select, Checkbox, Button, Badge} from 'antd'
import {DateRangePicker} from 'react-dates'
import {CalendarReminderFormContext} from '../../../context'
import moment from 'moment'
import 'react-dates/lib/css/_datepicker.css'
import 'react-dates/initialize'
import './ReminderPopupForm.less'

const {Option} = Select

const ReminderNameIconInput = () => {
  return (
    <Input.Group compact style={{display: 'flex', padding: 5}}>
      <Select>
        <Option value="1">An Option</Option>
      </Select>
      <Input title="Reminder Title" placeholder="Reminder Title"/>
    </Input.Group>
  )
}

const renderPropertyItem = (property) => {
  return (
    <Select.Option key={property.id} value={property.id}><Badge color={`#${property.color}`} text={property.name}/></Select.Option>
  )
}

const ReminderPropertySelection = () => {
  const properties = useSelector(s=>Object.values(s.properties))
  const renderProperties = () => {
    return properties.map((property)=>renderPropertyItem(property))
  }

  return (
    <Select style={{padding: 5}} placeholder='Select Property'>
      {renderProperties()}
    </Select>
  )
}

const ReminderRecurrenceSelector = () => {
  return (
    <div
      style={{
        display: 'flex',
        width:'100%',
        paddingTop: 10
      }}
    >
      <Select style={{flex:1}} defaultValue="22">
        <Option value="22">Does not repeat</Option>
      </Select>
      <Checkbox checked disabled style={{flex:1, alignSelf: 'center', paddingLeft:10}}>All day</Checkbox>
    </div>
  )
}
 
const ReminderDateSelector = () => {
  const [focused, setFocused] = useState()
  const {dateRange, setDateRange} = useContext(CalendarReminderFormContext)
  let start = moment()
  let end = moment()
  if(dateRange && dateRange.start && dateRange.end){
    start = dateRange.start
    end = dateRange.end
  }

  return (
    <div className="react-datepicker-wrapper">
      <DateRangePicker
        startDate={start}
        startDateId={`start-id${start.seconds()}`}
        endDate={end}
        endDateId='end-id'
        onDatesChange={({ startDate, endDate }) => {
          if(startDate > endDate){
            setDateRange({start:startDate, end:startDate})
            return
          }
          setDateRange({start:startDate, end:endDate})
        }
        }
        onFocusChange={focusedInput => setFocused(focusedInput)}
        focusedInput={focused}
        onClose={()=>setFocused(null)}
      />
    </div>
    
  )
}
 
const ReminderDateAndRecurrenceSelector = () => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      padding: 5
    }}>
      <ReminderDateSelector/>
      <ReminderRecurrenceSelector/>
    </div>
  )
}

const ReminderFormActions = () => {
  return (
    <div
      style={{
        paddingTop: 20,
      }}
    >
      <Button disabled style={{float:'right'}} type="primary" icon="plus-square">Save Reminder</Button>
    </div>
  )
}

const ReminderPopupForm = () => {
  const currentUser = useSelector(s=>s.currentUser)
  if(!currentUser.admin){return null}
  const {left, top, active} = useContext(CalendarReminderFormContext)
  const formRef = useRef()

  const renderLeft = () => {
    let offset = 0
    if(formRef.current && formRef.current.offsetWidth + left >= window.innerWidth){
      offset -= formRef.current.offsetWidth
    }
    return left + offset
  }
 
  const renderTop = () => {
    let offset = 0
    if(formRef.current && formRef.current.offsetHeight + top >= window.innerHeight){
      offset -= formRef.current.offsetHeight
    }
    return top + offset
  }

  return (
    <div ref={formRef} className={`reminder-popup-form ${active ? 'open' : ''}`} style={{
      left: renderLeft(),
      top: renderTop(),
    }}>
      <ReminderNameIconInput/>
      <ReminderPropertySelection/>
      <ReminderDateAndRecurrenceSelector/>
      <ReminderFormActions/>
    </div>
  )
}

export default ReminderPopupForm