import React from 'react'
import { connect } from 'react-redux'
import { Drawer, Button, Row, Col, Icon } from 'antd'

import CleanerDrawer from './CleanerDrawer'

class ReservationDrawer extends React.Component{

    state={
        cleanerDrawer: false
    }
    onClose = () => {
        this.props.onDrawerClose()
    }

    render() {
        if(!this.props.reservation){
            return null
        }
        return (
            <Drawer 
                width={640}
                visible={this.props.visible}
                onClose={this.onClose}
                title="Manage Reservation"
                >
                <CleanerDrawer visible={this.state.cleanerDrawer} onClose={()=>{this.setState({cleanerDrawer:false})}}/>
                <Row>
                    <Col span={12}>
                    <p style={pStyle}>Cleaner</p>
                    <Button icon="plus" onClick={()=>this.setState({cleanerDrawer:true})}>Assign Cleaner</Button>
                    </Col>
                    <Col span={12}>
                    <p style={pStyle}>Guest</p>
                    <Icon type="smile"/> {this.props.reservation.guest}<br/>
                    <Icon type="phone"/> {this.props.reservation.phone}
                    </Col>
                </Row>
                <DrawerLine>
                    <Button type="primary">Save</Button>
                </DrawerLine>
            </Drawer>
        )
    }
}

// const mapStateToProps = (state) => {
//     return ({
//         reservation: state.reservation
//     })
// }

export default connect()(ReservationDrawer)

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