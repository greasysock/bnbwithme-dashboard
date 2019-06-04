import React from 'react'
import {Icon, Drawer, List, Switch, Divider, Select, Badge} from 'antd'
import { connect } from 'react-redux' 

import {addPropertyToFilter} from '../../../actions'
import './CalendarSettings.less'

export const CalendarSetting = (props) => {
    return (
        <List.Item>
            <List.Item.Meta title={props.name}/> 
             <Switch onChange={(C)=>{props.onSwitch(props.name, C)}} defaultChecked={props.switchState}/> 
        </List.Item>
    )
}

const pStyle = {
    fontSize: 16,
    color: 'rgba(0,0,0,0.85)',
    lineHeight: '24px',
    display: 'block',
    marginBottom: 16,
  };

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

    handlePropertyFilterChange = (e) => {
        this.props.addPropertyToFilter(e)
    }

    renderPropertyItem(property){
        return (
            <Select.Option value={property.id} key={property.id} ><Badge color={`#${property.color}`} text={property.name}/></Select.Option>
        )
    }

    renderPropertiesForFilter(){
        return (
            <Select allowClear defaultValue={this.props.calendarSettings.propertyFilters} onChange={this.handlePropertyFilterChange} style={{width:'100%'}} mode='multiple' placeholder='Select Properties'>
                {this.props.properties.map((property)=>this.renderPropertyItem(property))}
            </Select>
            )
    }

    render(){
        // TODO: Refactor general properties to be all inside this component instead of in BigCalendarToolbar
        return (
            <>
                <Drawer title="Calendar Settings" closable={false} visible={this.state.showSettings} onClose={()=>this.setState({showSettings:false})} width={350}>
                    <p style={pStyle}>General</p>
                    <List split={false}>
                        {this.props.controls()}
                    </List>
                    <Divider/>
                    <p style={pStyle}>Property Filters</p>
                    {this.renderPropertiesForFilter()}
                </Drawer>
                {this.renderHandle()}
            </>

        )
    }
}

const mapStateToProps = (state) => {
    return ({
        properties: Object.values(state.properties),
        calendarSettings: state.calendarSettings
    })
}

export default connect(mapStateToProps, {addPropertyToFilter})(CalendarSettings)
