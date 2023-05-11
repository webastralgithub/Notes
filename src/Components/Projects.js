import React,{useState,useLayoutEffect,useRef} from 'react'
import { Editor } from 'react-draft-wysiwyg'

import "./Projects.css"

import MiniHeader from './MiniHeader';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import { useLocation } from 'react-router-dom';



const Projects = () => {
 

 

  const[goals,setGoals]=useState([])
  const[notes,setNotes]=useState()
  const[notesText,setNotesText]=useState("")
  const[notesScreen,setNotesScreen]=useState(false)
  const[isEdit,setIsEdit]=useState(false)
  const[id,setID]=useState()
  const[title,setTitle]=useState()

  const url=process.env.REACT_APP_API_KEY
  

  let arr=[]
  for(let i=1;i<=10;i++){
    arr.push(i)
  }

  

  useLayoutEffect(() => {
    (async () => {
      try {
        const response = await 
          axios.get(`${url}/note`,config)
console.log(response.data.data)
        setNotes(
       response.data.data
        
          );
      } catch (error) {
        console.log(error);
      }

    })();

      
  

   
  }, [notesScreen]);



const deleteNote=async()=>{
  const res = await axios.delete(`${url}/note/${id}`,config);
  setNotesScreen(false)
}
  const changeScreen=(from)=>{
    
  console.log('here',from.title)
    
       setTitle(from.title)
        setNotesText(from.description)
        setID(from.id)
        
  setIsEdit(true)
    setNotesScreen(true)
  }


  const token =JSON.parse(localStorage.getItem('token'));
  let config = {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  }
  
 
   
   const submit= async()=>{
    const body ={
    
     
     title:title,


     description:notesText,
    

    }

    var form_data = new FormData();
    // var form_data2 = new FormData();
    
   
    for ( var key in body ) {
        form_data.append(key, body[key]);
    }
console.log(body)
if(isEdit){
  const res = await axios.patch(`${url}/note/${id}`,body,config);
  console.log(res.data)
  setNotesScreen(false)
  return
}
    const res = await axios.post(`${url}/note`,form_data,config);
    console.log(res.data)
    setNotesScreen(false)
 
   }
 
  return (
    <div>
    <MiniHeader head='Therapy Notes' />
   {!notesScreen&& <div>
    
    <div className='search-filter'>
   
    <input placeholder='search' className='custom_search_filter'/>
    <img src='/images/search_icon.png' className='search_img' />
   
    <div className='short'>
    Short:<Button><img src='/images/short.svg'/></Button></div>
    </div>
  <div className='addnotes-wrapper'>
   <div className='addnote-child addone-value' onClick={()=>{
    setTitle('')
    setNotesText('')
    setNotesScreen(true)
  }}>
    <img src='/images/addnote.svg'/>
   <p>New note</p>
    </div>
    
    {notes?.length>0&& notes.map(note=><div className='addnote-child'>
    <h5>{note.created_at.slice(0,10)}</h5>
    <p>{note.title}</p>
    <div className='timing'>
    <p>{new Date(note.created_at).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}</p>
<img onClick={()=>{

  changeScreen(note)

}} src='/images/right-arrow.svg'/></div>
    </div>)}
    
   
   
    </div>
    </div>}
    {notesScreen && <div>
    <form >
  <div className="input-group">
  
    <div className="input-group-btn">
      <button className="btn btn-default" type="submit">
        <i className="glyphicon glyphicon-search"></i>
      </button>
    </div>
 
  </div>
</form>
<label>Title</label>
<div>
<input value={title} onChange={(e)=>setTitle(e.target.value)} style={{width:'40%',height:"45px"}} type='text'></input>  

      
    


  <p className='therepy-headings'> Enter your text here* </p>

    <input value={notesText} onChange={(e)=>setNotesText(e.target.value)} style={{width:'100%',height:"107px"}} type='text'></input>   
  
    
 
 
   
 

    {isEdit && <button className='custom_notes' onClick={deleteNote}><img src="/images/del.png" alt="my image"  /></button>}
   <button className='custom_notes_save' onClick={submit}><img src="/images/save.png" alt="my image" /></button>
   </div>
   </div>}
 </div>
 

  )
}

export default Projects