import * as React from 'react'
import {createBrowserHistory} from 'history'

export interface IHistoryContextValue {
  history: any
}

export const HistoryContext = React.createContext<IHistoryContextValue>(null)

const history = createBrowserHistory()

export const HistoryContextProvider: React.FunctionComponent = ({children}) => {
  return <HistoryContext.Provider value={{history}}>{children}</HistoryContext.Provider>
}