import React from 'react'
import Dropdown from './Dropdown'
import Notifications from './Notifications'
import './Menu.less'
export default class UserMenu extends React.Component{
    render(){
        return (
            <div className="right">
                <Dropdown/>
            </div>
        )
    }
}