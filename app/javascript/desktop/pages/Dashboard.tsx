import * as React from 'react'
import { HistoryContext } from '../contexts/HistoryContext';
import { AuthRoutes } from '../router/routes';

const Dashboard = () => {
  const {history} = React.useContext(HistoryContext)
  history.push(AuthRoutes.calendar)
  return ( 
  <div>
    dashboard
  </div>
   );
}
 
export default Dashboard;