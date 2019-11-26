import {useSelector, useDispatch} from 'react-redux'
import {fetchReminderType} from '../actions'
import {useFontAwesome} from './index'

export const useReminderType = (reminderTypeId) => {
  const reminderType = useSelector(state => state.reminderTypes[reminderTypeId])
  const dispatch = useDispatch()
  if(!reminderType){
    dispatch(fetchReminderType(reminderTypeId))
  }

  let icon = null
  if(reminderType){
    icon = reminderType.symbol
  }

  icon = useFontAwesome(icon)

  return {...reminderType, icon}
}