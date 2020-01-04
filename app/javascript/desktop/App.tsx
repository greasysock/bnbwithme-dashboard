import * as React from 'react'
import {Route, Router, Switch} from 'react-router-dom'
import {HelmetProvider} from 'react-helmet-async'
import Calendar from './pages/Calendar'
import Dashboard from './pages/Dashboard'
import Properties from './pages/Properties'
import {HistoryContextProvider, HistoryContext} from './contexts/HistoryContext'
import {AuthRoute} from './router/AuthRoute'
import { AuthRoutes, NonAuthRoutes } from './router/routes'
import { Login } from './pages/Login'
import { Unauthorized } from './pages/Unauthorized'
import { NotFound } from './pages/NotFound'
import { UserRoles, userRoles } from '../shared/router/userRoles'

const App: React.FC = ():JSX.Element => {
  return (
    <HistoryContextProvider>
    <HelmetProvider>
    <HistoryContext.Consumer>
      {value=> {
        return (
          <Router history={value.history}>
          <Switch>
            <AuthRoute path={AuthRoutes.dashboard} exact Component={Dashboard} requiredRoles={userRoles.all}/>
            <AuthRoute path={AuthRoutes.calendar} exact Component={Calendar} requiredRoles={userRoles.all}/>
            <AuthRoute path={AuthRoutes.properties} exact Component={Properties} requiredRoles={userRoles.all}/>
    
            <Route path={NonAuthRoutes.login} exact component={Login} />
            <Route path={NonAuthRoutes.unauthorized} exact component={Unauthorized} />
            <Route component={NotFound} />
          </Switch>
        </Router>
        )
      }}
    </HistoryContext.Consumer>
    </HelmetProvider>
    </HistoryContextProvider>
   );
}
 
export default App;