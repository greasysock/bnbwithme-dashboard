import React from 'react'
import {Row, Col} from 'antd'
import NormalLayout from '../layout/NormalLayout'
import RecentActivity from './HomeWidgets/RecentActivity'
import PropertyReservationPie from './HomeWidgets/PropertyReservationPie'

export default class Home extends React.Component{
    render(){
        return (
            <NormalLayout>
                <Row type={'flex'} gutter={8}>
                    <Col span={20}>
                        <RecentActivity/>
                    </Col>
                    <Col span={4}>
                        <PropertyReservationPie/>
                    </Col>
                </Row>

            </NormalLayout>
        )
    }
}