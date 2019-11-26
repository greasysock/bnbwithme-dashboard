import React from 'react'
import {connect} from 'react-redux'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {Table} from 'antd'
import {fetchReminderTypes} from '../../../actions'
import {useFontAwesome} from '../../../hooks'

const Symbol = ({iconId}) => {
    const icon = useFontAwesome(iconId)
    return (
        <FontAwesomeIcon icon={icon}/>
    )
}

const columns = [
    {
        title: 'Symbol',
        dataIndex: 'symbol',
        key:'symbol',
        render: symbol => (
            <Symbol iconId={symbol}/>
        )
    },
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name'
    }
]

class ManageReminderTypes extends React.Component{

    componentDidMount() {
        this.props.fetchReminderTypes()
    }

    prepareData = () => {
        if(this.props.reminderTypes){
            return Object.values(this.props.reminderTypes).map((reminderType)=>{
                reminderType.key = reminderType.id
                return reminderType
            })
        }
        return []
    }
    render(){
        return (
            <>
                <div style={{ background: '#fff', padding: 0, minHeight: 280}}>
                    <Table columns={columns} dataSource={this.prepareData()}/>
                </div>
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        reminderTypes: state.reminderTypes
    }
}

export default connect(mapStateToProps, {fetchReminderTypes})(ManageReminderTypes)