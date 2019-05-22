import React from 'react'

export default function(props){
    const style = {marginLeft: 'auto', marginRight:'auto'}
    if(props.content){
        style.height = "calc(100vh - 200px)"
    }
    return(
        <div style={style}>
            {props.children}
        </div>
    )
}