import * as React from 'react'
import {Route, Router} from 'react-router-dom'
import {HelmetProvider} from 'react-helmet-async'
import Calendar from './pages/Calendar'
import Dashboard from './pages/Dashboard'
import Properties from './pages/Properties'
import {createBrowserHistory} from 'history'
import Wrapper from './components/layout/Wrapper'

const history = createBrowserHistory()

const App = () => {
  return (
    <HelmetProvider>
    <Router history={history}>
      <Wrapper>
        <Route path="" exact component={Dashboard} />
        <Route path="/calendar" exact component={Calendar} />
        <Route path="/properties" component={Properties} />
      </Wrapper>
    </Router>
    </HelmetProvider>
   );
}
 
export default App;