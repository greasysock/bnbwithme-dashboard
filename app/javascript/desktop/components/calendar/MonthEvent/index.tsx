import * as React from 'react';
import styles from './styles.module.scss'
import { Reservation, User } from '../../../../shared/types/graphql';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBroom, faBook, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { bnbAirbnb, bnbVrbo } from '../../../../shared/images/icons';
import { Service } from '../../../../shared/types/reservation';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';

export * from './getMonthEventProps'

export enum EventType {
  reservation,
  reminder,
  cleaning
}

export interface MonthData {
  type: EventType
  data: Reservation
  start: string
  end: string
}

export interface IMonthEventProps {
  event: MonthData
  continuesPrior: boolean
  continuesAfter: boolean
}

export function MonthEvent ({event}: IMonthEventProps) {
  switch(event.type){
    case EventType.reservation: return <MonthReservationEvent {...event.data}/>
    case EventType.cleaning: return <MonthCleaningEvent {...event.data}/>
  }
  return (
    <div>
      I am an event!
    </div>
  );
}

function MonthReservationEvent ({guest, ical, property}: Reservation) {
  const service = Service[ical.service]
  let icon = faBook
  switch(service){
    case Service.airbnb:
      icon = bnbAirbnb
      break
    case Service.vrbo:
      icon = bnbVrbo
      break
  }
  return (
    <div>
      <FontAwesomeIcon className={styles.icon} size='lg' icon={icon}/>
      {property.name} - {guest}</div>
  )
}

const GET_CLEANER = gql`
  query ($cleanerId: ID!){
    user(userId: $cleanerId){
      firstName
    }
  }
`

type userFetch = {user:User}

const MonthCleaner = ({cleanerId, property}:Reservation) => {
  const getCleaner = useQuery<userFetch>(GET_CLEANER, {variables:{cleanerId}})
  if(!getCleaner.loading){
    return <div className={styles.cleaner}>{getCleaner.data.user.firstName} => {property.name}</div>
  }
  return null
} 

function MonthCleaningEvent (props: Reservation) {
  let icon = faExclamationTriangle
  if(props.cleanerId){
    icon = faBroom
  }

  return (
    <div className={styles.cleaningEventComponent}>
      <FontAwesomeIcon className={styles.icon} icon={icon}/>
      {
        props.cleanerId ?
        <MonthCleaner {...props} /> :
        `No Cleaner => ${props.property.name}`
      }
    </div>
  )
}