import React from 'react'

import {Table, Card} from 'antd'

class PropertyReservationPie extends React.Component {
    render() {
        return (
            <Card title={'Property Reservations Pie Chart'}>
                <Table loading bordered={false}></Table>
            </Card>
        )
    }
}

export default PropertyReservationPie