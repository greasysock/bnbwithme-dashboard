import * as React from 'react';
import styles from './layout.module.scss'
import { Tabs, Tab } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTachometerAlt, faCalendar, faBuilding } from '@fortawesome/free-solid-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { AuthRoutes } from '../../router/routes';
import { HistoryContext } from '../../contexts/HistoryContext';
import { useStyles } from '../../../shared/hooks';

interface ITabLabelProps {
  name: string
  icon: IconProp
  selected: boolean
}

function TabLabel ({name, icon, selected}:ITabLabelProps) {
  const tabStylesArray = [styles.tabLabel]
  if(selected){
    tabStylesArray.push(styles.active)
  }
  const tabStyles = useStyles(tabStylesArray)
  return (
    <div className={tabStyles}>
      <div className={styles.icon}><FontAwesomeIcon size='lg' icon={icon}/></div>
      <div>{name}</div>
    </div>
  )
}

interface IMenuItemProps{
  icon: IconProp
  name: string
  path: string
  selected: boolean
  disabled?: boolean
}

function MenuItem ({icon, name, path, selected, disabled=false}:IMenuItemProps) {
  const {history} = React.useContext(HistoryContext)
  
  return (
    <Tab disabled={disabled} selected={selected} onClick={()=>history.push(path)} label={<TabLabel selected={selected} name={name} icon={icon}/>}/>
  )
}

type menuItem = {
  icon: IconProp,
  name: string,
  path: string,
  disabled?: boolean
}

const menuItems:menuItem[] = [
  {
    icon: faTachometerAlt,
    name: 'Dashbaord',
    path: AuthRoutes.dashboard,
    disabled: true
  },
  {
    icon: faCalendar,
    name: 'Calendar',
    path: AuthRoutes.calendar
  },
  {
    icon: faBuilding,
    name: 'Properties',
    path: AuthRoutes.properties,
    disabled: true
  }
]

export function TabNavigation () {
  const [value, setValue] = React.useState(0)

  const renderMenuItems = () => {
    return menuItems.map((m, i)=>{
      const selected = window.location.pathname === m.path
      if(selected && value !== i){
        setValue(i)
      }
      return <MenuItem disabled={m.disabled} selected={selected} icon={m.icon} name={m.name} path={m.path} key={i}/>
    })
  }

  return (
    <Tabs
      value={value}
      indicatorColor="primary"
      textColor="primary"
    >
      {renderMenuItems()}
    </Tabs>
  );
}
