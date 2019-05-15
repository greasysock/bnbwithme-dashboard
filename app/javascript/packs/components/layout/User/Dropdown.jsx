import React from 'react'
import {Menu, Avatar, Dropdown, Icon} from 'antd'
import {connect} from 'react-redux'
import {signOut} from '../../../actions'
import './Menu.less'

class UserDropdown extends React.Component {
    menuRender() {
      return (
        <Menu className="menu" selectedKeys={[]}>
          <Menu.Item key="userCenter">
            <Icon type="user" />
            Account Center
          </Menu.Item>
          <Menu.Item key="userinfo">
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