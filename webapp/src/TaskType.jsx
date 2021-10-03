import React from 'react';
import './TaskType.css';
import {Menu} from 'semantic-ui-react'

function TaskType(props) {

    return (
        <div>
            <Menu borderless inverted color='green' > 
            <Menu.Item   >New Task</Menu.Item >  
            </Menu>
            <label class='name'>Select Task Type: </label>
            <input type="radio"  class='task' checked={props.checkInPerson} onChange={props.changeInPerson}  />
            <label class='name' >In Person</label>
            <input type="radio" class='task' checked={props.checkOnline} onChange={props.changeOnline} />
            <label class='name'>Online</label>
            
        </div>
    )


}

export default TaskType



