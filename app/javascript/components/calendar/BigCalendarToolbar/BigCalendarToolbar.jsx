import PropTypes from 'prop-types'
import React from 'react'
import cn from 'classnames'
import {connect} from 'react-redux'
import {Button, Icon} from 'antd'
import { navigate } from '../../../utils/bigCalendarConstants'
import './BigCalendarToolbar.less'
import CalendarSettings,{CalendarSetting} from '../CalendarSettings/CalendarSettings'
import {toggleReservations, toggleCleanings} from '../../../actions'

class Toolbar extends React.Component {
  render() {
    let {
      localizer: { messages },
      label,
    } = this.props

    return (
      <div className="rbc-toolbar-mod">
        <Button.Group>
          <Button
            type="button"
            onClick={this.navigate.bind(null, navigate.PREVIOUS)}
          >
            <Icon type="left"/>
            {messages.previous}
          </Button>
          <Button
            type="button"
            onClick={this.navigate.bind(null, navigate.TODAY)}
          >
            {messages.today}
          </Button>
          <Button
            type="button"
            onClick={this.navigate.bind(null, navigate.NEXT)}
          >
            {messages.next}
            <Icon type="right"/>
          </Button>
        </Button.Group>

        <span className="rbc-toolbar-label">{label}</span>

        <span style={{paddingLeft:200}} className="rbc-btn-group"><CalendarSettings controls={this.calendarControls}/></span>
      </div>
    )
  }

  calendarControls = () => {
    return(
        <>
            <CalendarSetting onSwitch={()=>{this.props.toggleReservations()}} switchState={this.props.calendarSettings.showReservations} name="Reservations"/>
            <CalendarSetting onSwitch={()=>{this.props.toggleCleanings()}} switchState={this.props.calendarSettings.showCleanings} name="Cleanings"/>
        </>
    )
}

  navigate = action => {
    this.props.onNavigate(action)
  }

  view = view => {
    this.props.onView(view)
  }

  viewNamesGroup(messages) {
    let viewNames = this.props.views
    const view = this.props.view

    if (viewNames.length > 1) {
      return viewNames.map(name => (
        <button
          type="button"
          key={name}
          className={cn({ 'rbc-active': view === name })}
          onClick={this.view.bind(null, name)}
        >
          {messages[name]}
        </button>
      ))
    }
  }
}

Toolbar.propTypes = {
  view: PropTypes.string.isRequired,
  views: PropTypes.arrayOf(PropTypes.string).isRequired,
  label: PropTypes.node.isRequired,
  localizer: PropTypes.object,
  onNavigate: PropTypes.func.isRequired,
  onView: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => {
  return({
    calendarSettings: state.calendarSettings
  })
}

export default connect(mapStateToProps, {toggleCleanings, toggleReservations})(Toolbar)