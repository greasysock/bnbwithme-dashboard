import * as React from 'react'
import {Route, Router, Switch} from 'react-router-dom'
import {HelmetProvider} from 'react-helmet-async'
import Calendar from './pages/Calendar'
import Dashboard from './pages/Dashboard'
import Properties from './pages/Properties'
import {createBrowserHistory} from 'history'
import Wrapper from './components/layout/Wrapper'

const history = createBrowserHistory()

const App: React.FC = ():JSX.Element => {
  return (
    <HelmetProvider>
    <Router history={history}>
      <Wrapper>
        <Switch>
          <Route path="/" exact component={Dashboard} />
          <Route path="/calendar" exact component={Calendar} />
          <Route path="/properties" component={Properties} />
        </Switch>
      </Wrapper>
    </Router>
    </HelmetProvider>
   );
}
 
export default App;