import React from 'react'
import Header from './Header'
import Footer from './Footer'
import Navigation from './Navigation'
import Content from './Content'

import layout from './layout.module.scss'

const Skeleton = ({children}) => {
  return (
    <div>
      <Header/>
        <Content>{children}</Content>
      <Footer/>
    </div>
  )
}

export default Skeleton