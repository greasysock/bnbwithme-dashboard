import React from 'react'
import { Link } from 'react-router-dom'
import {Menu, Icon, Layout} from 'antd'
import NormalLayout from './NormalLayout'
import UserMenu from './User/Menu'
import bnbwithmeLogo from 'images/stickyheader.png'

export default class Header extends React.Component{
    state = {
        current: ''
    }
    render(){
        return (
            <Layout.Header style={{background: "#fff", height: 'auto'}}>
                <NormalLayout>
                    <div style={{marginBottom:'20px'}}>
                        <img className="logo" src={bnbwithmeLogo} style={{
                            height: '2rem',
                            lineHeight: '2rem',
                        }}/>
                        <div style={{dispaly:'inline-flex', float: 'right'}}>
                            <UserMenu/>
                        </div>
                    </div>
                    <Menu
                        theme="light" 
                        onClick={(e)=>this.setState({current:e.key})} 
                        selectedKeys={[this.state.current]}
                        mode="horizontal"
                        style={{ lineHeight: '32px' }}
                        >
                        <Menu.Item key='home'>
                            <Link to="/"> <Icon type="dashboard"/> Dashboard </Link>
                        </Menu.Item>
                        <Menu.Item key='properties'>
                            <Link to="/properties"> <Icon type="home"/> Properties </Link>
                        </Menu.Item>
                        <Menu.Item key='calendar'>
                            <Link to="/calendar"> <Icon type="calendar"/> Calendar </Link>
                        </Menu.Item>
                    </Menu>
                </NormalLayout>
            </Layout.Header>
        )
    }
}