import React from 'react'
import {connect} from 'react-redux'
import {Table, Button} from 'antd'
import {fetchReminderTypes} from '../../../actions'

const columns = [
    {
        title: 'Symbol',
        dataIndex: 'symbol',
        key:'symbol',
        render: symbol => (
            <i className={`fa ${symbol}`}/>
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

    renderReminderTypeAdd(){
        return (
            <Button
            type="dashed"
            style={{ width: '100%', marginBottom: 8 }}
            icon="plus"
            onClick={()=>{}}
          >New Reminder Type</Button>
        )
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
                {this.renderReminderTypeAdd()}
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