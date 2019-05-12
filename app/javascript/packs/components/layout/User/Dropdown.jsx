import React from 'react'
import {Menu, Avatar, Dropdown} from 'antd'

const menu = (
    <Menu>
      <Menu.Item>
        <a href="#">Notifications</a>
      </Menu.Item>
      <Menu.Divider/>
      <Menu.Item>
        <a href="#">Settings</a>
      </Menu.Item>
      <Menu.Item>
        <a href="#">Sign out</a>
      </Menu.Item>
    </Menu>
  );

export default class UserDropdown extends React.Component {
    render() {
        return (
            <Dropdown overlay={menu} placement="bottomRight">
                <Avatar icon="user"/>
            </Dropdown>
        )
    }
}