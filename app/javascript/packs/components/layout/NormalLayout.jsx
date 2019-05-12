import React from 'react'

export default function(props){
    return(
        <div style={{marginLeft: 'auto', marginRight: 'auto', width: '1200px'}}>
            {props.children}
        </div>
    )
}