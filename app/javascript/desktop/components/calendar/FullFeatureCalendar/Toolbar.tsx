import * as React from 'react';
import { Button, ButtonGroup, Fab } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight, faCog } from '@fortawesome/free-solid-svg-icons';
import styles from './styles.module.scss'

enum navigate {
  PREVIOUS = 'PREV',
  NEXT = 'NEXT',
  TODAY = 'TODAY',
  DATE = 'DATE'
}

enum views {
  MONTH = 'month',
  WEEK = 'week',
  WORK_WEEK = 'work_week',
  DAY = 'day',
  AGENDA = 'agenda'
}

export interface IToolbarProps {
  view: string
  views: string[]
  label: string
  localizer: any
  onNavigate: (action:navigate)=>{}
  onView: (action:views)=>{}
}

export function Toolbar ({view, views, label, localizer, onNavigate, onView}: IToolbarProps) {
  const [month, year] = label.split(" ")
  return (
    <div className={styles.Toolbar}>
      <div className={styles.leftActions}>
        <ButtonGroup className={styles.buttonGroup} color="primary" variant="text" size="small">
          <Button onClick={()=>{onNavigate(navigate.PREVIOUS)}} startIcon={<FontAwesomeIcon icon={faChevronLeft}/>}>
            Back
          </Button>
          <Button onClick={()=>{onNavigate(navigate.TODAY)}}>Today</Button>
          <Button onClick={()=>{onNavigate(navigate.NEXT)}} endIcon={<FontAwesomeIcon icon={faChevronRight}/>}>
            Next
          </Button>
        </ButtonGroup>
      </div>
      <div className={styles.title}>
        <div className={styles.month}>
          {month}
        </div>
        <div className={styles.year}>
          {year}
        </div>
      </div>
      <div className={styles.rightActions}>
        <div className={styles.content}>
        <Fab color="primary" size="small">
          <FontAwesomeIcon size='lg' className={styles.actionSvg} icon={faCog}/>
        </Fab>
        </div>
      </div>
    </div>
  );
}
