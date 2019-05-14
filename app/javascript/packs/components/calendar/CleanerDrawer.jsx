import React from 'react'
import { Drawer } from 'antd'

import {DrawerLine} from './ReservationDrawer'

class CleanerDrawer extends React.Component{
    render(){
        return(
            <Drawer 
                title="Assign a Cleaner" 
                visible={this.props.visible}
                onClose={()=>this.props.onClose()}
                >

            </Drawer>
        )
    }
}

export default CleanerDrawer