import React from 'react'
import { Link } from 'react-dom'
import { Card, Button, Icon, Form, Input } from 'antd'
import './default.less'
import bnbwithmeLogo from 'images/stickyheader.png'

class SessionCreate extends React.Component {
    userForm() {
        return (
            <Form className="login-form">
                <Form.Item style={{minHeight:'0%'}}>
                    <Input
                        placeholder="Email"
                    />
                </Form.Item>
                <Form.Item>
                    <Input
                        type="password"
                        placeholder="Password"
                    />
                </Form.Item>
                <Button block type="primary">
                    Sign In
                </Button>
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

export default SessionCreate
