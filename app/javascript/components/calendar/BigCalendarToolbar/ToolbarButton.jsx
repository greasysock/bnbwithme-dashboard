import React from 'react'
import {Icon} from 'antd'

const ToolbarButton = ({icon='setting', style={}}) => {
    return (
        <div className="handle" style={{...style}}>
        <Icon
        type={icon}
        style={{
            color: '#fff',
            fontSize: 20,
        }}
        />
        </div>
    )
}

export default ToolbarButton