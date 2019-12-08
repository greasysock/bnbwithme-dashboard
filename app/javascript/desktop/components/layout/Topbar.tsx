import * as React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import layout from './layout.module.scss'

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: 'black'
  }
}))

const Topbar = () => {
  return ( 
    <AppBar color="inherit" className={layout.topbar} position="static">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu">
          <MenuIcon />
        </IconButton>
        <Typography className={layout.title} variant="h6" >
          bnbwithme
        </Typography>
        <Button color="inherit">Login</Button>
      </Toolbar>
    </AppBar>
   )
}
 
export default Topbar