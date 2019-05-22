import React from 'react'
import {connect} from 'react-redux'
import { Table, Divider, Tag, Button, Card, message } from 'antd'

import UserForm, {EDIT_FORM, NEW_FORM} from '../../user/UserForm'
import {fetchUsers, createUser, updateUser, destroyUser} from '../../../actions'
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

    state={
        userFormVisible: false,
        formTitle: NEW_FORM,
        formCallback: this.newSubmitCallback,
        targetUserId: null,
        targetUser: null
    }

    editSubmitCallback = (formValues) => {
        this.props.updateUser(this.state.targetUserId, formValues, this.successCallback)
    }
    newSubmitCallback = (formValues) => {
        this.props.createUser(formValues, this.successCallback)
    }

    successCallback = () => {
        message.success("User saved")
        this.handleFormClose()
    }

    renderAddUser(){
        return (
            <Button
            type="dashed"
            style={{ width: '100%', marginBottom: 8 }}
            icon="plus"
            onClick={()=>this.setState({userFormVisible:true, formTitle: NEW_FORM, formCallback: this.newSubmitCallback})}
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

    handleUserEditClick = (user) => {
        this.setState({formTitle: EDIT_FORM, formCallback: this.editSubmitCallback, targetUserId: user.id, targetUser: user, userFormVisible: true})
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
                    <a onClick={()=>this.handleUserEditClick(user)}>edit</a>
                    <Divider type="vertical"/>
                    <a>delete</a>
                </span>
                )
            }/>
            </Table>
        )
    }

    handleFormClose = () => {
        this.setState({userFormVisible:false, targetUser: null, targetUserId: null})
    }

    componentDidMount() {
        this.props.fetchUsers()
    }
    
    render(){
        return(
            <NormalLayout>
                <UserForm enableReinitialize initialValues={this.state.targetUser} visible={this.state.userFormVisible} onClose={this.handleFormClose} title={this.state.formTitle} onFormSubmit={this.state.formCallback}/>
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

export default connect(mapStateToProps, {fetchUsers, createUser, updateUser, destroyUser})(Users)