import React from 'react'
import {Menu, Avatar, Dropdown, Icon} from 'antd'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {signOut} from '../../../actions'
import history from '../../history'
import './Menu.less'

class UserDropdown extends React.Component {
    manageUsersRender() {
      return (
        <Menu.Item onClick={()=>history.push('/admin/users')} key="manageusers">
          <Icon type="user" />
          Manage Users
        </Menu.Item>
        )
    }
    manageEventsRender() {
      return (
        <Menu.Item disabled onClick={()=>history.push('/admin/event_types')} key="manageevents">
          <Icon type="form" />
          Manage Event Types
        </Menu.Item>
        )
    }
    adminRender(){
      if(!this.props.currentUser.admin){
        return
      }
      return [
        this.manageUsersRender(),
        this.manageEventsRender()
      ]
        
    }
    menuRender() {
      return (
        <Menu className="menu" selectedKeys={[]}>
          {this.adminRender()}
          <Menu.Item disabled key="userinfo">
            <Icon type="setting" />
            Account Settings
          </Menu.Item>
          <Menu.Divider />
          <Menu.Item key="logout" onClick={()=>{this.props.signOut()}}>
            <Icon type="logout" />
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