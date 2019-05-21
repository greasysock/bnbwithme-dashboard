import React from 'react'
import { Field, reduxForm, reset } from 'redux-form'
import { Modal, Button, Form, Row, Col, Input, Switch } from 'antd'

export const EDIT_FORM = "Edit selected User"
export const EDIT_FORM_SELF = "Edit Account"
export const NEW_FORM = "Create a New User"

const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 },
    },
  }

class UserForm extends React.Component{
    renderTextInput({input, meta, type, label, required}){
        return (
            <Form.Item required={required} label={label}>
                <Input {...input} type={type}/>
            </Form.Item>
            )
    }
    renderPasswordInput({input, meta, type, label, required}){
        return (
            <Form.Item required={required} label={label}>
                <Input.Password {...input}/>
            </Form.Item>
        )
    }
    renderSwitchInput({input, meta, type, label}){
        let checked = input.value
        if(!input.value){
            checked = false
        }
        return (
            <Form.Item label={label}>
                <Switch checked={checked} onClick={(change)=>input.onChange(change.valueOf())}/>
            </Form.Item>
        )
    }
    handleModalClose = () => {
        this.props.dispatch(reset("UserForm"))
        this.props.onClose()
    }
    onSubmit = (formValues) => {
        delete formValues.confirmPassword
        this.props.onFormSubmit(formValues)
        this.props.dispatch(reset("UserForm"))
    }
    render(){
        return (
            <Modal onOk={this.props.handleSubmit(this.onSubmit)} visible={this.props.visible} onCancel={this.handleModalClose} width={1280} closable={false} title={this.props.title}>
                <Form {...formItemLayout}>
                <Row gutter={20}>
                    <Col span={12}>
                        <Field label="Email" required name="email" component={this.renderTextInput}/>
                        <Field label="First Name" required name="firstName" component={this.renderTextInput}/>
                        <Field label="Last Name" required name="lastName" component={this.renderTextInput}/>
                    </Col>
                    <Col span={12}>
                        <Field label="Password" required name="password" component={this.renderPasswordInput}/>
                        <Field label="Confirm Password" required name="confirmPassword" component={this.renderPasswordInput}/>
                        <Field label="Cleaner" name="cleaner" component={this.renderSwitchInput}/>
                        <Field label="Admin" name="admin" component={this.renderSwitchInput}/>
                    </Col>
                </Row>
                </Form>
            </Modal>
        )
    }
}

export default reduxForm({form: 'UserForm',})(UserForm)