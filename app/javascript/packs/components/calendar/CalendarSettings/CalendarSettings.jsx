import React from 'react'
import {Icon, Drawer, List, Switch} from 'antd'
import './CalendarSettings.less'

export const CalendarSetting = (props) => {
    return (
        <List.Item>
            <List.Item.Meta title={props.name}/> 
             <Switch onChange={(C)=>{props.onSwitch(props.name, C)}} defaultChecked={props.switchState}/> 
        </List.Item>
    )
}

class CalendarSettings extends React.Component{
    state = {
        showSettings: false
    }
    renderHandle(){
        return (
            <div className="handle" onClick={()=>this.setState({showSettings:true})}>
                <Icon
                type='setting'
                style={{
                    color: '#fff',
                    fontSize: 20,
                }}
                />
            </div>
        )
    }

    render(){
        return (
            <>
                <Drawer title="Calendar Settings" closable={false} visible={this.state.showSettings} onClose={()=>this.setState({showSettings:false})}>
                    <List>
                        {this.props.controls()}
                    </List>
                </Drawer>
                {this.renderHandle()}
            </>

        )
    }
}

export default CalendarSettings
