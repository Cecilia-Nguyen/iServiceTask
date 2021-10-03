import React from 'react'
import { Menu } from 'semantic-ui-react'
import './Budget.css';

function Budget(props) {
    return (
        <div>
            <Menu borderless inverted color='green' > 
         
            <Menu.Item   >Suggest how much</Menu.Item >  
            </Menu>
            
            <label class='name'>What is your budget? </label><br></br>
            <label class='name'>(This is an estimate) </label><br></br>
            <input type="radio"  class='task' checked={props.checkTotal} onChange={props.changeTotal} value="Total" />
            <label class='name' >Total</label>
            <input type="radio" class='task'  checked={props.checkHourlyRate} onChange={props.changeHourlyRate} value="Hourly Rate"/>
            <label class='name'>Hourly Rate</label><br></br>
            <input type="text" class='number' checked={props.checkBudget} onChange={props.changeBudget}/><br></br>
        </div>

    )
}

export default Budget

