import { useState, useRef } from 'react'
import {useSelector} from 'react-redux'
import {_userHeaders} from '../actions'
import bnbwithme from '../api/bnbwithme'

export const useSearchReminderTypes = query => {
  const [results, setResults] = useState([])
  const lastValueRef = useRef()
  const currentUser = useSelector(s=>s.currentUser)
  const userHeader = _userHeaders(null, currentUser.jwt)
  if(query && (query != lastValueRef.current)){
    bnbwithme.get(`/reminder_types/search?q=${query}`, userHeader).then(r=>{
      setResults(r.data)
      lastValueRef.current = query
    })
  }
  return results
}