import React, {useState} from 'react'
import {useSelector} from 'react-redux'
import {Drawer} from 'antd'
import ToolbarButton from '../BigCalendarToolbar/ToolbarButton'

const CreateReminderButton = ({onClick = ()=>{}}) => {
  return (
    <div onClick={onClick}>
      <ToolbarButton style={{marginRight:10}} icon="plus-square" />
    </div>
  )
}

const CreateReminder = () => {
  const currentUser = useSelector(s=>s.currentUser)
  if(!currentUser.admin){return null}
  const [active, setActive] = useState(false)

  return (
    <>
    <CreateReminderButton onClick={()=>setActive(true)}/>
    <Drawer
      title="Add Reminder"
      visible={active}
      onClose={()=>setActive(false)}
      closable={false}
    >
      todo...
    </Drawer>
    </>
  )
}

export default CreateReminder