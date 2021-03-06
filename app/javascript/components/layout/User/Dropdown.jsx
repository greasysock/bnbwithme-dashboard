import React from 'react'
import {Menu, Avatar, Dropdown, Icon} from 'antd'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {signOut} from '../../../actions'
import history from '../../history'
import './Menu.less'

const itemStyle = {
  marginRight: 10
}

class UserDropdown extends React.Component {
    manageUsersRender() {
      return (
        <Menu.Item onClick={()=>history.push('/admin/users')} key="manageusers">
          <Icon style={itemStyle} type="user" />
          Manage Users
        </Menu.Item>
        )
    }
    manageRemindersRender() {
      return (
        <Menu.Item onClick={()=>history.push('/admin/reminder_types')} key="managereminders">
          <Icon style={itemStyle} type="form" />
          Manage Reminder Types
        </Menu.Item>
        )
    }
    adminRender(){
      if(!this.props.currentUser.admin){
        return
      }
      return [
        this.manageUsersRender()
      ]
        
    }
    menuRender() {
      return (
        <Menu className="menu" selectedKeys={[]}>
          {this.adminRender()}
          <Menu.Item disabled key="userinfo">
            <Icon style={itemStyle} type="setting" />
            Account Settings
          </Menu.Item>
          <Menu.Divider />
          <Menu.Item key="logout" onClick={()=>{this.props.signOut()}}>
            <Icon style={itemStyle} type="logout" />
            Logout
          </Menu.Item>
        </Menu>
      )
    }
    render() {
        return (
            <Dropdown overlayClassName="dropdownContainer" overlay={this.menuRender()}>
              <span className="action account">
                  <Avatar icon="user" className="avatar" />
                  <span className="name">{`${this.props.currentUser.firstName} ${this.props.currentUser.lastName}`}</span>
              </span>
            </Dropdown>
        )
    }
}

const mapStateToProps = state => {
  return {
    currentUser: state.currentUser
  }
}

export default connect(mapStateToProps, {signOut})(UserDropdown)