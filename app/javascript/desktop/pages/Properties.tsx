import * as React from 'react'
import { HistoryContext } from '../contexts/HistoryContext';
import { AuthRoutes } from '../router/routes';

const Properties = () => {
  const {history} = React.useContext(HistoryContext)
  history.push(AuthRoutes.calendar)
  return ( 
    <div>
      Prop
    </div>
   );
}
 
export default Properties;