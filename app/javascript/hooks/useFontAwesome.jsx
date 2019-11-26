import {faTrash, faBroom, faMoneyBillWave, faTools, faBed, faQuestionCircle, faCalendar, faExclamation, faCut} from '@fortawesome/free-solid-svg-icons'

// meant to limit font awesome imports by mapping icons names to imported icons and vice versa.

const icons = [
  faTrash,
  faBroom,
  faMoneyBillWave,
  faTools,
  faBed,
  faQuestionCircle,
  faCalendar,
  faExclamation,
  faCut
]

export const useFontAwesome = (iconId) => {
  if(!iconId){return faQuestionCircle}
  const reducedId = iconId.substr(3)
  switch(reducedId){
    case faTrash.iconName: return faTrash
    case faBroom.iconName: return faBroom
    case faMoneyBillWave.iconName: return faMoneyBillWave
    case faTools.iconName: return faTools
    case faBed.iconName: return faBed
    case faQuestionCircle.iconName: return faQuestionCircle
    case faCalendar.iconName: return faCalendar
    case faExclamation.iconName: return faExclamation
    case faCut.iconName: return faCut
    default: return faQuestionCircle
  }
}

export const useFontAwesomeIcons = () => {
  return [...icons]
}