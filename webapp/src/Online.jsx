import React from 'react'
import './Describe.css';



function Online  (props)
{

        return (
            <div style={{marginTop:"1%"}}>
            <label class='name'>Date</label>
            <input type="text"  class='title'  onChange={props.changeDate} /> <br></br>
           
            </div>
        )
}

export default Online
