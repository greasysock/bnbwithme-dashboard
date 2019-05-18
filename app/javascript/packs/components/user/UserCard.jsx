import React from 'react'
import {connect} from 'react-redux'
import {Card, Avatar} from 'antd'

const UserCard = (props) => {
    const user = props.user
    return (
        <div>
            <Card style={{...props.style, marginRight: 20, marginBottom:20}}>
                <Card.Meta avatar={<Avatar/>} title={`${user.firstName} ${user.lastName}`} description={props.description}/>
            </Card>
            {props.components}
        </div>
    )
}

const mapStateToProps = (state, ownProps) => {
    return ({
        user: state.users[ownProps.userId]
    })
}

export default connect(mapStateToProps)(UserCard)