import React from 'react'
import {connect} from 'react-redux'
import {fetchUsers} from '../../actions'
import {Card, Avatar} from 'antd'

class UserCard extends React.Component {
    componentDidMount(){
        this.props.fetchUsers()
    }
    render(){
        if(!this.props.user){
            return <div>Loading...</div>
        }
        const user = this.props.user
        return (
            <div>
                <Card style={{...this.props.style, marginRight: 20, marginBottom:20}}>
                    <Card.Meta avatar={<Avatar/>} title={`${user.firstName} ${user.lastName}`} description={this.props.description}/>
                </Card>
                {this.props.components}
            </div>
    )}
}

const mapStateToProps = (state, ownProps) => {
    return ({
        user: state.users[ownProps.userId]
    })
}

export default connect(mapStateToProps, {fetchUsers})(UserCard)