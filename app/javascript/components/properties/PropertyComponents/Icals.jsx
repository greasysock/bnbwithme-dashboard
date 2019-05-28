import React from 'react'
import {connect} from 'react-redux'
import {Table, Tag} from 'antd'
import moment from 'moment'
import {fetchPropertyIcals} from '../../../actions'
import {ServiceIcon} from '../../../helpers/calendarHelpers'

const columns = [
    {title: 'Service', dataIndex: 'service', key: 'service'},
    {title: 'Last Checked', dataIndex: 'lastChecked', key: 'lastChecked'},
    {title: 'Status', dataIndex: 'status', key:'status'}
]

const StatusTag = (props) => {
    const lastChecked = moment(props.updatedAt)
    if ((moment()-lastChecked) > moment(0).add(2, 'hours')){
        return <Tag color="red">Error</Tag>
    }
    return <Tag color="green">Okay</Tag>
}

class Icals extends React.Component{
    componentDidMount(){
        this.props.fetchPropertyIcals(this.props.propertyId)
    }
    mapPropsToData(){
        return Object.values(this.props.icals).map((ical)=>{
            return({
                key: ical.id,
                service: (<ServiceIcon service={ical.service}/>),
                lastChecked: moment(ical.updatedAt).fromNow(),
                status: (<StatusTag updatedAt={ical.updatedAt}/>)
            })
    })
    }
    render() {
        if(!this.props.icals){
            return <div>Loading...</div>
        }
        return(
            <Table pagination={false} columns={columns} dataSource={this.mapPropsToData()}/>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return ({
        icals: state.propertyIcals[ownProps.propertyId]
    })
}

export default connect(mapStateToProps, {fetchPropertyIcals})(Icals)