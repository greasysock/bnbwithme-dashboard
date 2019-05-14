import React from 'react'
import {BrowserRouter, Route} from 'react-router-dom'
import { connect } from 'react-redux'
import 'antd/dist/antd.css'

import Wrapper from './layout/Wrapper'
import Properties from './properties/Properties'
import Calendar from './calendar/Calendar'
import Home from './pages/Home'

const authView = (
    <BrowserRouter>
        <Wrapper>
            <Route path="/" exact component={Home}/>
            <Route path="/properties" component={Properties}/>
            <Route path="/calendar" component={Calendar}/>
        </Wrapper>
    </BrowserRouter>
)

const loginView = (
    <div>
        login!
    </div>
)

class App extends React.Component{
    authenticateUser(){
        if (this.props.currentUser.isSignedIn){
            return authView
        } else {
            return loginView
        }
    }

    render(){
        return this.authenticateUser()
    }
}

const mapStateToProps = (state) => {
    return {currentUser: state.currentUser}
}

export default connect(mapStateToProps)(App)