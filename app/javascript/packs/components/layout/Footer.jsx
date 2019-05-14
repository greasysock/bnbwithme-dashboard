import React from 'react'
import { Layout } from 'antd'
import NormalLayout from './NormalLayout'

export default class Footer extends React.Component{
    render(){
        return (
            <Layout.Footer style={{background:'#fff', color: '#9aa0ac'}}>
                <NormalLayout>
                    Copyright © 2019 <a href="http://bnbwithme.com">bnbwithme.</a>
                </NormalLayout>
            </Layout.Footer>
        )
    }
}