import React,{useState} from 'react';
import './App.css';
import 'semantic-ui-css/semantic.min.css'
import TaskType from './TaskType'
import InPerson from './InPerson.jsx'
import Describe from './Describe'
import Budget from './Budget'
import SubmitButton from './SubmitButton'
import Online from './Online'

function App() {
  const[render, settingUpTask] =useState(<InPerson changeSuburb ={TaskSuburb} changeDate = {TaskDate}/>)
  const [Type, setType] = useState('InPerson')
  const [Title, setTitle] =useState("")
  const [Description, setDescription] = useState("")
  const [Suburb, setSuburb] = useState("")
  const [Date, setDate] = useState("")
  const [BudgetType, setBudgetType] = useState("Total")
  const [BudgetAmount, setBudget]= useState("")
  function Submit(){

    fetch('http://localhost:8000/task', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body : JSON.stringify({
        Type: Type,
        Title: Title,
        Description: Description,
        Suburb: Suburb,
        Date: Date,
        BudgetType: BudgetType,
        BudgetAmount: BudgetAmount
        
      })
      })
      .then(response => {
        response.json()})
      .then(data => console.log(data))
      .catch(err => {
      console.log("Error:" + err)
    })
}
  return (
    <div className = 'App' >
 
      <TaskType
      changeInPerson={TaskInPerson} 
      checkInPerson = {Type ==="InPerson"}
      changeOnline={TaskOnline}
      checkOnline = {Type ==="Online"}
      
      ></TaskType>
      
      <Describe
      changeTitleTask ={TaskTitle}
      changeDescriptionTask = {TaskDescription}
      ></Describe>
      <div>{render}</div>
      
      <Budget
      changeTotal ={BudgetTypeChoice}
      checkTotal = {BudgetType === "Total"}
      changeHourlyRate ={BudgetTypeChoice}
      checkHourlyRate = {BudgetType === "Hourly Rate"}
      changeBudget ={Number}></Budget>
      <SubmitButton Submit={Submit} />

    </div>
  );
  
  
  function TaskOnline(){
    settingUpTask(<Online changeSuburb ={setSuburb("")} changeDate = {TaskDate}/>)
    setType("Online")
    }
   function TaskInPerson(){
    settingUpTask(<InPerson 
      changeSuburb ={TaskSuburb} changeDate = {TaskDate}/>)
    setType("InPerson")
    } 
    function TaskTitle(task){
      setTitle(task.target.value)
     
    }
    function TaskDescription(task){
      setDescription(task.target.value)
    }
    function TaskSuburb(task){
      setSuburb(task.target.value)
     
    }
    function TaskDate(task){
      setDate(task.target.value)
    }
    
    
    function BudgetTypeChoice(task){
      setBudgetType(task.target.value)
    }
    
    function Number(task){
      setBudget(task.target.value)
    }
    

}

export default App;
