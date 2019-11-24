import React from 'react'
import {Input, Select, DatePicker, Checkbox, Button} from 'antd'
import './ReminderPopupForm.less'

const {Option} = Select

const ReminderNameIconInput = () => {
  return (
    <Input.Group compact style={{display: 'flex', padding: 5}}>
      <Select>
        <Option value="1">An Option</Option>
      </Select>
      <Input title="Reminder Name" placeholder="Reminder Name"/>
    </Input.Group>
  )
}

const ReminderPropertySelection = () => {
  return (
    <Select style={{padding: 5}}>
      <Option value="3">Prop 1</Option>
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
      <Checkbox style={{flex:1, alignSelf: 'center', paddingLeft:10}}>All day</Checkbox>
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
      <Button style={{float:'right'}} type="primary" icon="plus-square">Save Reminder</Button>
    </div>
  )
}

const ReminderPopupForm = ({left=0,top=0,  active=false}) => {
  return (
    <div className={`reminder-popup-form ${active ? 'open' : ''}`} style={{
      left,
      top,
      width: 400,
    }}>
      <ReminderNameIconInput/>
      <ReminderPropertySelection/>
      <ReminderDateAndRecurrenceSelector/>
      <ReminderFormActions/>
    </div>
  )
}

export default ReminderPopupForm