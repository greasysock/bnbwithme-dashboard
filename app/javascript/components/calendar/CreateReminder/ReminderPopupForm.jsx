import React, {useContext, useRef} from 'react'
import {useSelector} from 'react-redux'
import {Input, Select, DatePicker, Checkbox, Button, Badge} from 'antd'
import {CalendarReminderFormContext} from '../../../context'
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
        width:'100%'
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
  return (
    <DatePicker.RangePicker/>
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