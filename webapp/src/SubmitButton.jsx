import React from 'react'
import { Button} from 'semantic-ui-react'

function SubmitButton (props)
 { 
        return (
                <div >
            <Button  color='black' style={{width:'250px',height:'50px',marginLeft:'1000px' }} onClick={props.Submit}>Post Task</Button>
            </div>
        )
}
export default SubmitButton
