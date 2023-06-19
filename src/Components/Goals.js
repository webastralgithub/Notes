import axios from 'axios'
import React, { useState,useEffect,useLayoutEffect, useRef } from 'react'
import { Alert, Button } from 'react-bootstrap'
import MiniHeader from './MiniHeader'
import './goal.css'

const Goals = () => {

const[goals,setGoals]=useState([])
const[err,setErr]=useState("")
const goalref =useRef('');
const selected=useRef('')

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
      console.log(res.data.data);
}
 
  const deleteGoal= async()=>{
   
   
    const res = await axios.delete(`${url}/goal/${selected.current.value}`,config);
    
    goalref.current.value=''
    selected.current.value=''
    getGoals();
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
      return <option  value={goal.id}>{goal.title} 
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
{goals.length>0 &&<>
  <span className='goal-span'> Delete</span>
  <div className='input-head'>

 <select
  className="form-control"
  ref={selected}
  aria-label="Floating label select example"
  >
  <option value="choose" disabled selected="selected">
  <p>Add or delete multiple Fields according
to your Goals</p>
  </option>
  {getCountry()}
  </select>
<button className='goal-btn btn-save' onClick={deleteGoal}><img src='\images\delete-icon.svg'/>Delete</button>
</div></>}
</div>
</div>
    </div>
  )
}

export default Goals