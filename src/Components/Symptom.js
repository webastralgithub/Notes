import axios from 'axios'
import React, { useState,useEffect,useLayoutEffect, useRef } from 'react'

import { Col, Form } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import MiniHeader from './MiniHeader'
import "./symptom.css"
const Symptom = () => {
    const[goals,setGoals]=useState([])
    const[val,setVal]=useState()
    const[currentRating,setCurrentRating]=useState()
    const[symptomData,setSymptomData]=useState([])
    const goalref = useRef();
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
const rating= async()=>{
   
   
    //const res = await axios.delete(`${url}/goal/${selected.current.value}`,config);
    
    goalref.current.value=''
    getGoals();
  }
const getGoals=async()=>{
 
  
      const res = await axios.get(`${url}/symptom`,config);
      setGoals(res.data.data);
      console.log(res.data.data);
}
 
const handlechange = (e) => {
 
    const updatedOptions = [...e.target.options]
      .filter(option => option.selected)
      .map(x => x.value);
    console.log("updatedOptions", updatedOptions);
    setVal(updatedOptions);
  
  }
  
  const submit= async()=>{
    const input =goalref.current.value
    const body={
      title:input
    }
    const res = await axios.post(`${url}/symptom`,body,config);
    
    goalref.current.value=''
    getGoals();
  }
  const getCountry=()=> {
    return goals.map((goal) => {
      return <option  selected={goal.title==val} value={goal.title}>{goal.title} 
             </option>;
    });
  }
const submitdata=async()=>{

const rest = await axios.get('https://ipapi.co/timezone')
    console.log(symptomData,rest.data);
    var body={
      timezone:rest.data,
      symptom_ids:{

      }
    }
 symptomData.map((sym)=>{
   console.log(goals)
  const currentSymptom=goals.filter((goal)=>{
     
    return goal.title==sym.symptom
  })
console.log(currentSymptom)
body.symptom_ids[currentSymptom[0].id]=sym.rating
})
console.log(body);
  const res = await axios.post(`${url}/symptom_tracking`,body,config);
  console.log('res',res);
  if (res.data.success){
    console.log('hwrere');
    navigate("/chart")
  }
}
  const saveSymptom=()=>{
    if(val?.length>0 && currentRating?.length>0){
    const newSymptomData=symptomData
   for(let i=0;i<newSymptomData?.length;i++)
   {
     if( newSymptomData[i].symptom==val){
      newSymptomData[i].rating=currentRating
      console.log(newSymptomData)
      setSymptomData(newSymptomData)
      setVal()
setCurrentRating()
      return
     }


   }
 
setSymptomData([...symptomData,{
  symptom:val,
  rating:currentRating,

}])
setVal()
setCurrentRating()
    }
  }

  return (
    <div>
    <MiniHeader head='Symptoms' />
    <div style={{display:'flex'}} className="symptom">
    <div style={{width:"40%"}} className="custom_symtom_form">
    <img  src='/images/goals.png'/>
    </div>
    <div className="custom_symtom_section" style={{width:"50%"}}>
<h4>Add or delete multiple Fields according
to your Symptoms</h4>
<div className='input_symptom'>
  <span class="symptom_add">ADD</span>
<input ref={goalref} type='text'></input>

<button className='btn-add' onClick={submit}>Add</button>

</div>
</div>
</div>
<div style={{display:'flex'}} className="custom_symptom_form">
<Form.Group as={Col} controlId="my_multiselect_field">
<Form.Label>My Symptoms</Form.Label>
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
{symptomData.map(sym=>(
  <div>
  {sym.symptom}:{sym.rating}
  </div>))}
  
<button onClick={saveSymptom} className='btn-save'>Save</button>
<button onClick={submitdata} className='btn-save'>Submit</button>
</div>



</div>
    </div>
  )
}

export default Symptom