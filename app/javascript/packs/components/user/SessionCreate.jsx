import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { Card, Button, Icon, Form, Input } from 'antd'

import {signIn} from '../../actions'
import './default.less'
import bnbwithmeLogo from 'images/stickyheader.png'

class SessionCreate extends React.Component {
    renderInput({input, meta, placeholder, type}){
        return (
            <Form.Item>
                <Input {...input} placeholder={placeholder} type={type} />
            </Form.Item>
        )
    }

    onSubmit = (formValues) => {
        this.props.signIn(formValues)
    }

    userForm() {
        return (
            <Form onSubmit={this.props.handleSubmit(this.onSubmit)} className="login-form">
                <Field name="email" placeholder="Email" component={this.renderInput}/>
                <Field name="password" placeholder="Password" type="password" component={this.renderInput}/>
                <Button htmlType="submit" block type="primary" className="login-form-button">Sign In</Button>
            </Form>
        )
    }

    render(){
        return(
            <div className={'container'}>
                <div className={'content'}>
                    <div className={'top'}>
                        <div className={'header'}>
                            <img className="logo" src={bnbwithmeLogo}/>
                        </div>
                        <div className={'desc'}>Rental Managment</div>
                    </div>
                    <Card className='login-content'>
                        {this.userForm()}
                    </Card>
                </div>
            </div>
        )
    }
}

const validate = (formValues) => {
    const errors = {}
    if(!formValues.email){
        errors.email = "Please Enter Email"
    }
    if(!formValues.password){
        errors.password = "Please Enter Email"
    }
    return errors
}

const formWrapped = reduxForm({
    form: 'SessionCreate',
    validate
})(SessionCreate)

export default connect(null, {signIn})(formWrapped)
