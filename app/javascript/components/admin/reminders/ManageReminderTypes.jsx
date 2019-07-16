import React from 'react'
import {connect} from 'react-redux'
import {fetchReminderTypes} from '../../../actions'

class ManageReminderTypes extends React.Component{

    componentDidMount() {
        this.props.fetchReminderTypes()
    }

    render(){
        return (
            <div>
                Hello World
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        reminderTypes: state.reminderTypes
    }
}

export default connect(mapStateToProps, {fetchReminderTypes})(ManageReminderTypes)