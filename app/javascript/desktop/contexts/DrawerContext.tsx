import * as React from 'react'
import {useState} from 'react'

export interface DrawerContextInterface{
  toggle: ()=>boolean,
  open: ()=>void,
  close: ()=>void,
  opened: boolean
}

export const DrawerContext = React.createContext<DrawerContextInterface>(null)

export const DrawerContextProvider = ({children}) => {
  const [opened, setOpened] = useState(false)

  return (
    <DrawerContext.Provider value={{
      toggle: ()=>{setOpened(s=>!s);return opened},
      open: ()=>setOpened(true),
      close: ()=>setOpened(false),
      opened
    }}>
      {children}
    </DrawerContext.Provider>
  )
}


