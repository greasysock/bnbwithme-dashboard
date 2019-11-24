import React, {useState, useContext, useRef} from 'react'
import {useSelector} from 'react-redux'
import ToolbarButton from '../BigCalendarToolbar/ToolbarButton'
import {CalendarReminderFormContext} from '../../../context'

const CreateReminder = () => {
  const currentUser = useSelector(s=>s.currentUser)
  if(!currentUser.admin){return null}

  const {active, open, close} = useContext(CalendarReminderFormContext)
  const buttonRef = useRef()

  const handleOpen = () => {
    const top = buttonRef.current? buttonRef.current.offsetTop : 0
    const left = buttonRef.current? buttonRef.current.offsetLeft : 0
    open(left, top)
  }
  return (
    <div ref={buttonRef} onClick={()=>active ? close() : handleOpen()}>
      <ToolbarButton style={{marginRight:10}} icon="plus-square" />
    </div>
  )
}

export default CreateReminder