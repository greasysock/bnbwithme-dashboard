import React from 'react'
import {connect} from 'react-redux'
import {fetchProperty} from '../../actions'
import Icals from './PropertyComponents/Icals'

class Property extends React.Component{
    componentDidMount(){
        this.props.fetchProperty(this.props.propertyId)
    }
    render(){
        return (<div style={{ background: '#fff', padding: 0}}>
           <Icals propertyId={this.props.propertyId}/>
        </div>)
    }
}

const mapStateToProps = (state, ownProps) => {
    const propertyId = ownProps.match.params.id
    return ({
        property: state.properties[propertyId],
        propertyId,
    })
}

export default connect(mapStateToProps, {fetchProperty})(Property)