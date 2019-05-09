import React from 'react'
import 'antd/dist/antd.css'

import BigReservationList from './BigReservationList'

export default class App extends React.Component{
    render(){
        return (
            <div>
                <BigReservationList/>
            </div>
        )
    }
}