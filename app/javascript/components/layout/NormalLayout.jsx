import React from 'react'

export default function(props){
    const style = {marginLeft: 'auto', marginRight:'auto'}
    return(
        <div style={style}>
            {props.children}
        </div>
    )
}