import React from 'react'
import { Drawer, Radio } from 'antd'
import { connect } from 'react-redux'
import {fetchUsers} from '../../actions'

class UserDrawer extends React.Component{
    componentDidMount(){
        this.props.fetchUsers()
    }

    renderUsers(){
        return (
            this.props.users.map((user)=> {
                return (
                    <Radio key={user.id} value={user.id}>{user.firstName} {user.lastName}</Radio>
                )
            })
        )
    }

    render(){
        return(
            <Drawer
                closable={false}
                title={this.props.title}
                visible={this.props.visible}
                onClose={()=>this.props.onClose()}
                >
                <Radio.Group onChange={this.props.onUserClick} value={this.props.defaultUserId}>
                    {this.renderUsers()}
                </Radio.Group>
            </Drawer>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    if(ownProps.cleaners){
        return {
            users: Object.values(state.users).filter((u)=> u.cleaner)
        }
    }
    return {
        users: Object.values(state.users)
    }
}

export default connect(mapStateToProps, {fetchUsers})(UserDrawer)