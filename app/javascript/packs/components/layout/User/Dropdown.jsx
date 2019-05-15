import React from 'react'
import {Menu, Avatar, Dropdown} from 'antd'
import {connect} from 'react-redux'
import {signOut} from '../../../actions'

class UserDropdown extends React.Component {
    menuRender() {
      return (
        <Menu>
          <Menu.Item>
            <a href="#">Notifications</a>
          </Menu.Item>
          <Menu.Divider/>
          <Menu.Item>
            <a href="#">Settings</a>
          </Menu.Item>
          <Menu.Item onClick={()=>{this.props.signOut()}}>
            <a href="#">Sign out</a>
          </Menu.Item>
        </Menu>
      )
    }
    render() {
        return (
            <Dropdown overlay={this.menuRender()} placement="bottomRight">
                <Avatar icon="user"/>
            </Dropdown>
        )
    }
}

export default connect(null, {signOut})(UserDropdown)