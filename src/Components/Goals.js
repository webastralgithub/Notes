import axios from 'axios'
import React, { useState,useEffect,useLayoutEffect, useRef } from 'react'
import { Alert, Button } from 'react-bootstrap'
import { Col, Form } from "react-bootstrap";
import MiniHeader from './MiniHeader'
import './goal.css'
import { useNavigate } from 'react-router-dom'

const Goals = () => {

const[goals,setGoals]=useState([])
const[goalData,setGoalData]=useState([])
const[val,setVal]=useState()
const[currentRating,setCurrentRating]=useState()
const[err,setErr]=useState("")
const goalref =useRef('');
const selected=useRef('')
const navigate=useNavigate()

let arr=[]
    for(let i=1;i<=10;i++){
      arr.push(i)
    }

const url=process.env.REACT_APP_API_KEY
useLayoutEffect(() => {
 getGoals()
}, []);
const token =JSON.parse(localStorage.getItem('token'));
let config = {
  headers: {
    'Authorization': `Bearer ${token}`
  }
}

const getGoals=async()=>{
 
 
 
      const res = await axios.get(`${url}/goal`,config);
      setGoals(res.data.data);
    
}
const saveGoal=()=>{
  console.log(currentRating,val)
  if(val?.length>0 && currentRating?.length>0){
  const newGoalData=goalData
 for(let i=0;i<newGoalData?.length;i++)
 {
   if( newGoalData[i].goal==val){
    newGoalData[i].rating=currentRating
    console.log(newGoalData)
    setGoalData(newGoalData)
    setVal()
setCurrentRating()
    return
   }


 }

setGoalData([...goalData,{
goal:val,
rating:currentRating,

}])

setVal()
setCurrentRating()
  }
}
  const deleteGoal= async()=>{
   
   
    const res = await axios.delete(`${url}/goal/${selected.current.value}`,config);
    
    goalref.current.value=''
    selected.current.value=''
    getGoals();
  }



  const submitdata=async()=>{
    const rest = await axios.get('https://ipapi.co/timezone')
    var body={
      timezone:rest.data,
      goal_id:{

      }
    }
    goalData.map((sym)=>{
    
      const currentGoal=goals.filter((goal)=>{
         
        return goal.title==sym.goal
      })
    console.log(currentGoal)
    body.goal_id[currentGoal[0].id]=sym.rating
    })

        console.log(goalData,rest.data);
       

 
      const res = await axios.post(`${url}/goal_tracking`,body,config);
      console.log('res',res);
      if (res.data.success){

        navigate("/chart")
      }
    }
  const submit= async()=>{
    const input =goalref.current.value
    var found = false;
    for(var i = 0; i < goals.length; i++) {
        if (goals[i].title == input) {
            found = true;
            break;
        }
    }
    if(found){
      setErr("goal already exists")
      setTimeout(() => {
        setErr("")
      }, 1000);
      return
    }
    const body={
      title:input
    }
    const res = await axios.post(`${url}/goal`,body,config);
    
    goalref.current.value=''
    getGoals();
  }
  const getCountry=()=> {
    return goals.map((goal) => {
      return <option  selected={goal.title==val} value={goal.title}>{goal.title} 
             </option>;
    });
  } 
  return (
    <div>
    <MiniHeader head='Goals' />
    <div className='goals-wrapper'>
    <div style={{width:"40%"}}>
    <img  src='/images/goals.png'/>
    </div>
    <div style={{width:"60%"}}>
<h4 className='goal-heading'>Add or delete multiple Fields according
to your Goals</h4>
{err.length>0 &&<Alert>{err}</Alert> }
<div className='input-head first-input'>
<span className='goal-span'>ADD</span>
<input ref={goalref} type='text'></input>

<button className='goal-btn' onClick={submit}>Add</button>
</div>
<label>
Enter Comment

</label><input
type="text"
className='inp'
name="currentpassword"
style={{width:'100%',height:"107px"}}


/>

<div style={{display:'flex'}} className="custom_symptom_form">
{goals.length>0 &&<>

  <div className='input-head'>

  <Form.Group as={Col} controlId="my_multiselect_field">
  <Form.Label>My Goals</Form.Label>
  <Form.Control as="select"  onChange={e => setVal(e.currentTarget.value)}>
  <option value="choose" disabled selected="selected">
  
  </option>
  {getCountry()}
  </Form.Control>
  </Form.Group>
  <div style={{width:"5%"}}></div>
<div style={{width:"55%"}} className='custom_rating_section'>
<h4>Rating</h4>
<p>Pick a number between 1 and 10 to denote where you are in relation to achieving your goal. For reference, 1 would be used for the day you set your goal here, and 10 would mean you have achieved it.</p>
<div className='radio-input-head' style={{display:'flex'}}>
{arr.map((num)=>(  <div className='bullet-div'>
 
     <input type="radio" value={num}  checked={num==currentRating} onChange={e => setCurrentRating(e.currentTarget.value)} name='rare'>
     </input>
     {num}
     </div>
))}

  
</div>
{goalData.map(sym=>(
  <div>
  {sym.goal}:{sym.rating}
  </div>))}
  
<button onClick={saveGoal} className='btn-save'>Save</button>
<button onClick={submitdata} className='btn-save'>Submit</button>
</div>
{/* <button className='goal-btn btn-save' onClick={deleteGoal}><img src='\images\delete-icon.svg'/>Delete</button> */}
</div></>}
</div>
</div>
</div>
    </div>
  )
}

export default Goals