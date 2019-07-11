import React from 'react'

import {Table, Card} from 'antd'

class RecentActivity extends React.Component {
    render() {
        return (
            <Card title={'Recent Activity'}>
                <Table loading bordered={false}></Table>
            </Card>
        )
    }
}

export default RecentActivity