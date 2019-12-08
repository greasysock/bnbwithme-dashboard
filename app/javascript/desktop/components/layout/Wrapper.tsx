import * as React from 'react'
import {Helmet} from 'react-helmet-async'
import Topbar from './Topbar'
import Content from './Content'
import Theme from './Theme'
import layout from './layout.module.scss'

const SiteHeader = () => {
  return (
    <Helmet titleTemplate="%s | bnbwithme" bodyAttributes={{class:layout.global}}>
      <title>Vacation Rental</title>
    </Helmet>
  )
}

const Wrapper = ({children}) => {
  return (
    <Theme>
    <div className={layout.wrapper}>
      <SiteHeader/>
      <Topbar/>
      <Content>
        {children}
      </Content>
    </div>
    </Theme>
   );
}
 
export default Wrapper;