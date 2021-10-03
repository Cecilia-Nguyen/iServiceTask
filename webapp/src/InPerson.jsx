import React from 'react'
import './Describe.css';


function InPerson (props)
{
        return (
            <div style={{marginTop:"1%"}}>
           <label class='name'>Suburb</label>
            <input type="text"  style={{marginLeft:"9%"}} class='title'  onChange={props.changeSuburb}/> <br></br>
            <label class='name'>Date</label>
            <input type="text"  class='title'  onChange={props.changeDate} /> <br></br>
           
           </div>
            
              
        )
}

export default InPerson;




