import React from 'react'
import {connect} from 'react-redux'
import { Table, Divider, Tag, Button, Card } from 'antd'

import {fetchUsers} from '../../../actions'
import NormalLayout from '../../layout/NormalLayout'
const { Column, ColumnGroup} = Table

const USER_ROLE = {
    admin: {
        name: "admin",
        color: "red"
    },
    cleaner: {
        name: "cleaner",
        color: "blue"
    }
}

class Users extends React.Component{
    renderAddUser(){
        return (
            <Button
            type="dashed"
            style={{ width: '100%', marginBottom: 8 }}
            icon="plus"
          >New User</Button>
        )
    }

    renderRoles(user){
        const roles = []
        if(user.admin){
            roles.push(USER_ROLE.admin)
        }
        if(user.cleaner){
            roles.push(USER_ROLE.cleaner)
        }
        return roles
    }

    mapUsersToData() {
        if (this.props.users){
            return Object.values(this.props.users).map((u)=>{
                return({
                    ...u,
                    roles: this.renderRoles(u),
                    key: u.id
                })
            })
        }
    }

    renderTable() {
        return (
            <Table style={{padding:0}} pagination={false} dataSource={this.mapUsersToData()}>
            <ColumnGroup title="Name">
                <Column title="First Name" dataIndex="firstName" key="firstName"/>
                <Column title="Last Name"  dataIndex="lastName"  key="lastName"/>
            </ColumnGroup>
            <Column title="Email" dataIndex="email" key="email"/>
            <Column title="Roles" dataIndex="roles" key="roles" render={(roles, user)=>(
                roles.map((role)=>(
                    <Tag key={`${user.id}.${role.name}`} color={role.color}>{role.name}</Tag>
                ))
            )}/>
            <Column title="Action" key="action" render={(text, user) =>
                (
                <span>
                    <a>Edit</a>
                    <Divider type="vertical"/>
                    <a>Delete</a>
                </span>
                )
            }/>
            </Table>
        )
    }

    componentDidMount() {
        this.props.fetchUsers()
    }
    
    render(){
        return(
            <NormalLayout>
                {this.renderAddUser()}
                <div style={{ background: '#fff', padding: 0, minHeight: 280}}>
                    {this.renderTable()}
                </div>
            </NormalLayout>
        )
    }
}

const mapStateToProps = (state) => {
    return ({
        users: state.users
    })
}

export default connect(mapStateToProps, {fetchUsers})(Users)