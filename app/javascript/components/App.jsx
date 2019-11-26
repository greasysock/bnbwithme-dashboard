import React from 'react'
import {Route, Router} from 'react-router-dom'
import { connect } from 'react-redux'
import 'antd/dist/antd.less'
import history from './history'
import {signInFromLocalStorage} from '../actions'
import SessionCreate from './user/SessionCreate'
import Wrapper from './layout/Wrapper'
import Properties from './properties/Properties'
import Property from './properties/Property'
import Calendar from './calendar/Calendar'
import Home from './pages/Home'
import AdminUsers from './admin/users/Users'
import AdminManageReminderTypes from './admin/reminders/ManageReminderTypes'

class App extends React.Component{
    renderAdmin(){
        if(this.props.currentUser && this.props.currentUser.admin){

            return (
                <>
                <Route path="/admin/users" exact component={AdminUsers}/>
                <Route path="/admin/reminder_types" exact component={AdminManageReminderTypes}/>
                </> 
            )
        }
    }

    authView() {
        return (
        <Router history={history}>
            <Wrapper>
                <Route path="/" exact component={Home}/>
                <Route path="/properties" exact component={Properties}/>
                <Route path="/properties/:id" exact component={Property} />
                <Route path="/calendar" component={Calendar}/>
                {this.renderAdmin()}
            </Wrapper>
        </Router>
    )}

    authenticateUser(){
        if (this.props.currentUser.isSignedIn){
            return this.authView()
        } else {
            return <SessionCreate/>
        }
    }

    componentDidMount(){
        this.props.signInFromLocalStorage()
    }

    render(){
        return this.authenticateUser()
    }
}

const mapStateToProps = (state) => {
    return {currentUser: state.currentUser}
}

export default connect(mapStateToProps, {signInFromLocalStorage})(App)