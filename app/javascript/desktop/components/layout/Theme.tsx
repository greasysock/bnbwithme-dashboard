import * as React from 'react'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import bnbwithmeStyles from '../../../shared/styles/bnbwithme.scss'

const themePallete = createMuiTheme({
  palette: {
    primary: {
      main: bnbwithmeStyles.bnbwithmeBlueDarker
    }
  }
})

const Theme = ({children}): JSX.Element => {
  return ( 
    <ThemeProvider theme={themePallete}>
      {children}
    </ThemeProvider>
   )
}
 
export default Theme