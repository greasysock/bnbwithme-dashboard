import React, {useEffect} from 'react'
import {useDispatch} from 'react-redux'

import CleaningSchedule from './pages/CleaningSchedule'
import {signInFromLocalStorage} from '../actions'

const App = () => {
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(signInFromLocalStorage())
    },[])
    return (
        <CleaningSchedule/>
    )
}

export default App