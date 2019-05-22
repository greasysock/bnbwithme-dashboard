import React from 'react'
import BigReservationList from './BigReservationList'

export default class Calendar extends React.Component{
    render(){
        return (
            <div style={{ background: '#fff', padding: 12, minHeight: 280}}>
                <BigReservationList/>
            </div>
        )
    }
}