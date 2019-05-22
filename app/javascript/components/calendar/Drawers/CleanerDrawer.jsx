import React from 'react'
import { Drawer, Radio } from 'antd'
import { connect } from 'react-redux'
import {fetchUsers} from '../../../actions'
import {DrawerLine} from './ReservationDrawer'

class CleanerDrawer extends React.Component{
    componentDidMount(){
        this.props.fetchUsers()
    }

    renderCleaners(){
        return (
            this.props.cleaners.map((cleaner)=> {
                return (
                    <Radio key={cleaner.id} value={cleaner.id}>{cleaner.firstName} {cleaner.lastName}</Radio>
                )
            })
        )
    }

    render(){
        return(
            <Drawer 
                title="Assign a Cleaner" 
                visible={this.props.visible}
                onClose={()=>this.props.onClose()}
                >
                <Radio.Group onChange={this.props.onCleanerClick}>
                    {this.renderCleaners()}
                </Radio.Group>
            </Drawer>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        cleaners: Object.values(state.users).filter((user)=>{return user.cleaner})
    }
}

export default connect(mapStateToProps, {fetchUsers})(CleanerDrawer)