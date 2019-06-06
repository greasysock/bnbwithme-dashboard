import React from 'react'
import { connect } from 'react-redux'
import { Drawer, Button, Row, Col, Icon, Card, Avatar, message } from 'antd'

import {assignCleanerToReservation, fetchUsers} from '../../../actions'
import UserDrawer from '../../user/UserDrawer'

class ReservationDrawer extends React.Component{

    state={
        cleanerDrawer: false,
        cleanerId: null
    }

    onClose = () => {
        this.props.onDrawerClose()
        this.setState({cleanerId: null})
    }

    handleCleanerSelect = (e) => {
        const cleanerId = e.target.value
        this.setState({cleanerDrawer:false, cleanerId})
    }

    handleSuccessCleaner = () => {
        this.onClose()
        message.success('Cleaner assigned')
    }

    handleSaveReservation = () => {
        this.props.assignCleanerToReservation(this.props.reservationId, this.state.cleanerId, this.handleSuccessCleaner)
    }

    renderPhone(){
        if(this.props.reservation && this.props.reservation.phone){
            return (
                <span>
                     <Icon type="phone"/> {this.props.reservation.phone}
                </span>
            )
        }
        return null
    }

    renderGuest(){
        if(this.props.reservation && this.props.reservation.guest){
            return (
                <span>
                    <Icon type="smile"/> {this.props.reservation.guest}
                </span>
            )
        }
        return null
    }

    renderCleanerAdd(phrase) {
        if (this.props.currentUser && this.props.currentUser.admin){
            return (
                <Button icon="plus" onClick={()=>this.setState({cleanerDrawer:true})}>{phrase}</Button>
            )
        }
    }

    renderCleaner(){
        if(this.state.cleanerId){
            const cleaner = this.props.users[this.state.cleanerId]
            return (
                <div>
                    <Card style={{marginRight: 20, marginBottom:20}}>
                        <Card.Meta avatar={<Avatar/>} title={`${cleaner.firstName} ${cleaner.lastName}`} description="Cleaner"/>
                    </Card>
                    {this.renderCleanerAdd("Change Cleaner")}
                </div>

            )
        }
        return (
            this.renderCleanerAdd("Assign Cleaner")
        )
    }

    prepareDrawer = () => {
        if(!this.state.cleanerId && this.props.reservation && this.props.reservation.cleanerId){
            this.setState({cleanerId:this.props.reservation.cleanerId})
        }
    }

    componentDidUpdate() {
        this.prepareDrawer()
    }

    componentDidMount() {
        this.props.fetchUsers()
    }

    render() {
        return (
            <Drawer 
                width={640}
                visible={this.props.visible}
                onClose={this.onClose}
                title="Manage Reservation"
                >
                <UserDrawer title="Select a Cleaner" defaultUserId={this.state.cleanerId} cleaners visible={this.state.cleanerDrawer} onUserClick={this.handleCleanerSelect} onClose={()=>{this.setState({cleanerDrawer:false})}}/>
                <Row>
                    <Col span={12}>
                        <p style={pStyle}>Cleaner</p>
                        {this.renderCleaner()}
                    </Col>
                    <Col span={12}>
                        <p style={pStyle}>Guest</p>
                        {this.renderGuest()}<br/>
                        {this.renderPhone()}
                    </Col>
                </Row>
                <DrawerLine>
                    <Button onClick={this.handleSaveReservation} type="primary">Save</Button>
                </DrawerLine>
            </Drawer>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return ({
        reservation: state.reservations[ownProps.reservationId],
        users: state.users,
        currentUser: state.currentUser
    })
}

export default connect(mapStateToProps, {assignCleanerToReservation, fetchUsers})(ReservationDrawer)

const pStyle = {
    fontSize: 16,
    color: 'rgba(0,0,0,0.85)',
    lineHeight: '24px',
    display: 'block',
    marginBottom: 16,
  };

export const DrawerLine = (props) => {
    return (
        <div
        style={{
          position: 'absolute',
          bottom: 0,
          width: '100%',
          borderTop: '1px solid #e8e8e8',
          padding: '10px 16px',
          textAlign: 'right',
          left: 0,
          background: '#fff',
          borderRadius: '0 0 4px 4px',
        }}
      >
      {props.children}
      </div>
    )
}