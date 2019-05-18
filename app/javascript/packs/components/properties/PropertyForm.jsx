import React from 'react'
import { Modal, Button, Form, Row, Col, Input } from 'antd'
import { ChromePicker } from 'react-color'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import {ServiceIcon} from '../../helpers/calendarHelpers'
import UserDrawer from '../user/UserDrawer'
import UserCard from '../user/UserCard'

export const EDIT_FORM = "Edit this Property"
export const NEW_FORM = "Create a New Property"

const COLOR_WIDTH = 400

const Event = (props) => {
    const style = {
        borderRadius: '5px',
        color: 'white',
        border: '0px',
        display: 'block',
        backgroundColor: props.color,
        padding: 2,
        marginTop: 10,
        width: props.width
    }
    return (
        <div className="rbc-row-segment" style={style}>
            <ServiceIcon style={{paddingLeft:4}} service="airbnb"/> {props.name} - <b>Michael Scott</b>
        </div>
    )
}

class PropertyForm extends React.Component{

    state = {
        showUserDrawer: false
    }

    renderInput = ({input, meta, type}) => {
        return (
            <Form.Item label="Property Name">
                <Input {...input} type={type}/>
            </Form.Item>
            )
    }
    renderOwnerSelect = ({input, visible}) => {
        return (
                <UserDrawer 
                    onClose={()=>{this.setState({showUserDrawer: false})}} 
                    visible={visible} 
                    onUserClick={(e)=>{
                        input.onChange(e.target.value)
                        this.setState({showUserDrawer:false})
                    }}
                    />
            )
    }

    renderColor = ({input}) => {
        return(
            < ChromePicker color={input.value} width={COLOR_WIDTH} disableAlpha onChange={({hex})=>input.onChange(hex)}/>
        )
    }

    renderOpenDrawer = () => {
        return (
            <Form.Item label="Owner">
                <Button onClick={()=>this.setState({showUserDrawer:true})}>Choose an Owner</Button>
            </Form.Item>
        )
    }

    renderOwner = () => {
        if(this.props.formValues && this.props.formValues.ownerId){
            return (
                <>
                    {this.renderOpenDrawer()}
                    <UserCard userId={this.props.formValues.ownerId} description="Owner"/>
                </>
            )
        }
        return (
            this.renderOpenDrawer()
        )
    }

    render(){
        let selectedColor = "#8A0829"
        let propertyName = "Some Property"
        if (this.props.formValues){
            const {formValues} = this.props
            if (formValues.propertyName){
                propertyName = formValues.propertyName
            }
            if (formValues.color){
                selectedColor = formValues.color
            }
        }
        const formItemLayout = {
            labelCol: {
              xs: { span: 24 },
              sm: { span: 8 },
            },
            wrapperCol: {
              xs: { span: 24 },
              sm: { span: 16 },
            },
          };
        return (
            <Modal as={Form} closable={false} onCancel={()=>this.props.onClose()} title="Create a New Property" width={860} visible={this.props.show}>
                <Row gutter={20}>
                    <Form {...formItemLayout}>
                        <Col span={12} style={{textAlign:'left'}}>
                            <Field name="propertyName" component={this.renderInput}/>
                            {this.renderOwner()}
                            <Field visible={this.state.showUserDrawer} name="ownerId" component={this.renderOwnerSelect}/>
                        </Col>
                        <Col span={12}>
                            <Field name="color" component={this.renderColor}/>
                            <Event width={COLOR_WIDTH} name={propertyName} color={selectedColor}/>
                        </Col>
                    </Form>
                </Row>
            </Modal>
        )
    }
}

const wrapped = reduxForm({
    form: 'PropertyForm',
})(PropertyForm)

const mapStateToProps = (state) => {
    if (state.form.PropertyForm){
        return {
            formValues: state.form.PropertyForm.values
        }
    }
    return {}
}

export default connect(mapStateToProps)(wrapped)