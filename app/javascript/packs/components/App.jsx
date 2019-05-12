import React from 'react'
import {BrowserRouter, Route} from 'react-router-dom'
import 'antd/dist/antd.css'

import Wrapper from './layout/Wrapper'
import Properties from './properties/Properties'
import Calendar from './calendar/Calendar'
import Home from './pages/Home'

export default class App extends React.Component{
    render(){
        return (
            <BrowserRouter>
                <Wrapper>
                    <Route path="/" exact component={Home}/>
                    <Route path="/properties" component={Properties}/>
                    <Route path="/calendar" component={Calendar}/>
                </Wrapper>
            </BrowserRouter>
        )
    }
}