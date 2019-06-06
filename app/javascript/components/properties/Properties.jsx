import React from 'react'
import {List, Card, Icon, Button,message, Popconfirm} from 'antd'
import {connect} from 'react-redux'
import { Link } from 'react-router-dom'

import PropertyForm, {NEW_FORM, EDIT_FORM} from './PropertyForm'
import {fetchProperties, createProperty, updateProperty, destroyProperty} from '../../actions'
import './Properties.less'
import NormalLayout from '../layout/NormalLayout'

class Properties extends React.Component{

    state = {
        showPropertyForm: false,
        propertyFormTitle: NEW_FORM,
        formSubmitCallback: this.handleCreateProperty,
        targetEditPropertyValues: {},
        targetEditPropertyId: null,
    }

    formSuccess = () => {
        this.handleModalClose()
        message.success('Property Saved!')
    }

    handleCreateProperty = (formValues) => {
        this.props.createProperty(formValues, this.formSuccess)
    }

    handleUpdateProperty = (formValues) => {
        this.props.updateProperty(this.state.targetEditPropertyId, formValues, this.formSuccess)
    }

    handleDestroyProperty = (id) => {
        this.props.destroyProperty(id)
    }

    renderAddProperty(){
        if (this.props.currentUser.admin){
            return (
                <Button
                onClick={()=>this.setState({showPropertyForm:true, propertyFormTitle: NEW_FORM, formSubmitCallback: this.handleCreateProperty})}
                type="dashed"
                style={{ width: '100%', marginBottom: 8 }}
                icon="plus"
              >
                New Property
              </Button>
            )
        }
    }

    renderPropertyActions(property){
        const edit = <a onClick={()=>{
            const {color, name, ownerId, id} = property
            this.setState({
                targetEditPropertyValues: {color, name, ownerId},
                targetEditPropertyId: id,
                showPropertyForm: true,
                propertyFormTitle: EDIT_FORM,
                formSubmitCallback: this.handleUpdateProperty
            })
        }}>edit</a>

        const remove = (
            <Popconfirm
            title="Are you sure？"
            icon={<Icon type="question-circle-o" style={{ color: 'red' }} />}
            onConfirm={()=>this.handleDestroyProperty(property.id)}
          >
            <a href="#">delete</a>
          </Popconfirm>
        )
        if(this.props.currentUser.admin){
            return (
                [edit, remove]
            )
        }
        return []
    }

    renderProperty(property){
        return (
            <List.Item key={property.id} style={{borderLeft:`#${property.color} solid 5px`, borderRadius: '5px'}} actions={this.renderPropertyActions(property)}>
                <List.Item.Meta avatar={<Icon type="home" size="large"/>} title={ <Link to={`properties/${property.id}`}>{property.name}</Link>} />    
            </List.Item>
        )
    }

    renderProperties() {
        return (
            Object.values(this.props.properties).map((property)=>{
                return (
                    this.renderProperty(property)
                )
            })
        )
    }

    handleModalClose = () => {
        this.setState({
            showPropertyForm: false,
            targetEditPropertyValues: {},
            targetEditPropertyId: null
        })
    }

    componentDidMount() {
        this.props.fetchProperties()
    }

    render(){
        return (
            <>
            <PropertyForm initialValues={this.state.targetEditPropertyValues} onFormSubmit={this.state.formSubmitCallback} title={this.state.propertyFormTitle} onClose={this.handleModalClose} show={this.state.showPropertyForm}/>
            <NormalLayout className="cardList" content>
                {this.renderAddProperty()}
                <Card className="listCard" bordered={false} style={{ marginTop: 0 }} bodyStyle={{ padding: '0 32px 40px 32px' }} title="Properties List" headStyle={{borderBottom:'0'}}>
                    <List size="large" rowKey="id">
                        {this.renderProperties()}
                    </List>
                </Card>
            </NormalLayout>
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        currentUser : state.currentUser,
        properties : state.properties,
        users : state.users
    }
}

export default connect(mapStateToProps, {fetchProperties, createProperty, updateProperty, destroyProperty})(Properties)