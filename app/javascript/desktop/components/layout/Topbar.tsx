import * as React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import layout from './layout.module.scss'
import bnbwithmeHead from '../../../shared/images/stickyheader.png'
import { TabNavigation } from './TabNavigation'
import { HistoryContext } from '../../contexts/HistoryContext'
import { AuthRoutes } from '../../router/routes'

const Topbar = (): JSX.Element => {
  const {history} = React.useContext(HistoryContext)
  return ( 
    <AppBar color="inherit" className={layout.topbar} position="static">
      <div className={layout.topbarContainer}>
      <Toolbar>
        <Typography className={layout.title} >
          <img onClick={()=>history.push(AuthRoutes.dashboard)} style={{cursor: 'pointer'}} className={layout.image} src={bnbwithmeHead}/>
        </Typography>
        <Button color="inherit">Login</Button>
      </Toolbar>
      <TabNavigation/>
      </div>
    </AppBar>
   )
}
 
export default Topbar