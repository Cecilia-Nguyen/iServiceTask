import React from 'react'
import {Menu} from 'semantic-ui-react'
import './Describe.css';

function Describe (props)
{
        return (
            <div >
            <Menu borderless inverted color='green' > 
            <Menu.Item   >Describe your Task to Experts</Menu.Item >  
            </Menu>
            <label class='name'>Title</label>
            <input type="text"  class='title'  onChange={props.changeTitleTask} /> <br></br>
            <label class='name' >Description</label>
            <input type="text" class='description' onChange={props.changeDescriptionTask} /><br></br>
            
            <Menu borderless inverted color='green' > 
            <Menu.Item>Setting up your task</Menu.Item >  
            </Menu>
            
            </div>




        )
}

export default Describe

