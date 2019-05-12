import React from 'react'
import {Layout} from 'antd'
import Header from './Header'
import Footer from './Footer'

export default class Wrapper extends React.Component{
    render(){
        return (
            <Layout>
                <Header/>
                <Layout.Content style={{ padding: '10px 10px' }}>
                    {this.props.children}
                </Layout.Content>
                <Footer/>
            </Layout>
        )
    }
}