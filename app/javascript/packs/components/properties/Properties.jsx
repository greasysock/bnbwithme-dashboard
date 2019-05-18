import React from 'react'
import {List, Card, Icon, Button} from 'antd'
import {connect} from 'react-redux'

import {fetchProperties} from '../../actions'
import './Properties.less'
import NormalLayout from '../layout/NormalLayout'

class Properties extends React.Component{

    renderAddProperty(){
        if (this.props.currentUser.admin){
            return (
                <Button
                type="dashed"
                style={{ width: '100%', marginBottom: 8 }}
                icon="plus"
              >
                New Property
              </Button>
            )
        }
    }

    renderProperties() {
        return (
            Object.values(this.props.properties).map((property)=>{
                return (
                    <List.Item key={property.id} style={{borderLeft:`#${property.color} solid 3px`}}>
                        <List.Item.Meta avatar={<Icon type="home" size="large"/>} title={property.name}/>
                    </List.Item>
                )
            })
        )
    }

    componentDidMount() {
        this.props.fetchProperties()
    }

    render(){
        return (
            <NormalLayout className="cardList" content>
                <Card className="listCard" bordered={false} style={{ marginTop: 24 }} bodyStyle={{ padding: '0 32px 40px 32px' }} title="Properties List">
                    {this.renderAddProperty()}
                    <List size="large" rowKey="id">
                        {this.renderProperties()}
                    </List>
                </Card>
            </NormalLayout>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        currentUser : state.currentUser,
        properties : state.properties,
        users : state.users
    }
}

export default connect(mapStateToProps, {fetchProperties})(Properties)