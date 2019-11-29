import {useMemo} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {fetchReminderType} from '../actions'
import {useFontAwesome} from './index'

export const useReminderType = (reminderTypeId) => {
  const dispatch = useDispatch()
  const reminderType = useSelector(state => state.reminderTypes[reminderTypeId])

  useMemo(()=>{
    if(!reminderType){
      dispatch(fetchReminderType(reminderTypeId))
    }
  }, [reminderTypeId])

  let icon = null
  if(reminderType){
    icon = reminderType.symbol
  }

  icon = useFontAwesome(icon)

  return {...reminderType, icon}
}