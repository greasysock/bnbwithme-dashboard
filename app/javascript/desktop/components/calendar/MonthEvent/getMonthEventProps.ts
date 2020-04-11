import { MonthData, EventType } from "."
import { Moment } from "moment"
import styles from './styles.module.scss'
import chroma from 'chroma-js'
import { useStyles } from "../../../../shared/hooks"

export interface IgetMonthEventProps {
  event: MonthData
  start: Moment
  end: Moment
  isSelected: boolean
}

interface EventProps {
  className?: string
  style?: any
}

export const getMonthEventProps = (event:MonthData):EventProps => {
  switch(event.type){
    case EventType.reservation: return getReservationProps(event)
    case EventType.cleaning: return getCleaningProps(event)
  }
  return {}
}

const getReservationProps = (event:MonthData):EventProps => {
  const color = chroma(event.data.property.color)
  return {className:styles.reservationEvent, style:{'--color':color.hex(), '--darker-color':color.darken(1.2).hex()}}
}

const getCleaningProps = (event:MonthData):EventProps => {
  const cleaningStylesArray = [styles.cleaningEvent]
  if(event.data.cleanerId){
    cleaningStylesArray.push(styles.assignedCleaner)
  }
  const cleaningStyles = useStyles(cleaningStylesArray)
  return {className:cleaningStyles}
}
