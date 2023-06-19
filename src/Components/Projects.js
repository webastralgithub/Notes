import React,{useState,useLayoutEffect,useRef} from 'react'
import { Editor } from 'react-draft-wysiwyg'

import "./Projects.css"
import TextEditor from './ProjectEdit';
import MiniHeader from './MiniHeader';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import NotesDisp from './NotesDisp';


const Projects = () => {
 

 

  const[goals,setGoals]=useState([])
  const[notes,setNotes]=useState()
  const[notesText,setNotesText]=useState("")
  const[notesScreen,setNotesScreen]=useState(false)
  const [selected, setSelected] = useState();
  const[previous,setPrevious]=useState()

  const[title,setTitle]=useState()
  const [text, setText] = useState();
  const [weekly, setWeekly] = useState();
  const [achieved,setAchieved]=useState()
  const [selectedGoal, setSelectedGoal] = useState();
  const url=process.env.REACT_APP_API_KEY
  

  let arr=[]
  for(let i=1;i<=10;i++){
    arr.push(i)
  }


  const notesQuestions = [
    { id: 0, title: "What I feel proud of this week!", isSelected: true },
    { id: 1, title: "Wins of the week ", count: "12", isSelected: false },
    { id: 2, title: "Challenges of the week ", isSelected: true },
    { id: 3, title: "Topics I want to talk about in therapy", count: "12", isSelected: false },
    { id: 4, title: "Write about your self care for the week ", isSelected: true },
    { id: 5, title: "General journal entry for the week ", count: "12", isSelected: false },
    { id: 6, title: "Growth or change I noticed over the week  ", count: "12", isSelected: false },
    { id: 7, title: "New things I tried this week  ", count: "12", isSelected: false },
    { id: 8, title: "Things to work on this week", count: "12", isSelected: false },
  ]
  const getQuestions=()=> {
  
  console.log(selected)
    return notesQuestions.map((goal) => {
      return <option   value={goal.id} selected={goal.id==selected}>{goal.title} 
             </option>;
    });
  }
  const getCountry=()=> {


    return goals.map((goal) => {
      
      return <option    selected={goal.id==selectedGoal}  value={goal.id}>{goal.title} 
             </option>;
    });
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

      getGoals()
  

   
  }, []);
 const getGoals=async()=>{
   
   
   
    const res = await axios.get(`${url}/goal`,config);
    setGoals(res.data.data);
    console.log(res.data.data);
}



  const changeScreen=(from)=>{
    
  console.log('here',from.title)
    
       setTitle(from.title)
        setNotesText(from.description)
        
   setText(from.tracking.description)
      setAchieved(from.tracking.goal_rating)
       setWeekly(from.tracking.weekly_rating)
       setSelectedGoal(from.tracking.goal_id)
       
       
  
   setSelected(from.tracking.question_id)
    setPrevious(from.tracking.previous_week_description)
    
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
    //question_id:selected,

     description:notesText,
    //  answer:text.current.value,
    //  goal_rating:achieved,
    //  weekly_rating:weekly,
    //  goal_id:selectedGoal,
    //  previous_week_description:previous.current.value

    }
    const body2={
      question_id:selected,
      answer:text,
      goal_rating:achieved,
      weekly_rating:weekly,
      goal_id:selectedGoal,
      previous_week_description:previous
    }
    var form_data = new FormData();
    var form_data2 = new FormData();
    
    for ( var key in body2 ) {
      form_data2.append(key, body2[key]);
  }
    for ( var key in body ) {
        form_data.append(key, body[key]);
    }
console.log(body)
    const res = await axios.post(`${url}/note`,form_data,config);
    console.log(res.data)
    form_data2.append("note_id", res.data.data);
  
    const result = await axios.post(`${url}/tracking`,form_data2,config);
console.log(result,"adffafad")
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
<input value={title} onChange={(e)=>setTitle(e.target.value)} style={{width:'100%',height:"107px"}} type='text'></input>   
<TextEditor setNotesText={setNotesText} notesText={notesText}/>
<div>
      <h4 className='therepy-headings'>Select a Question to Write About</h4>
  <select
    className="form-control therepy-select"
  style={{width:'40%'}}
    aria-label="Floating label select example"
    onChange={e => setSelected(e.currentTarget.value)}

    >
    
    <option value="choose" disabled >
    <p>Select question</p>
    </option>
    {getQuestions()}
    </select>
  <p className='therepy-headings'> Enter your text here* </p>

    <input value={text} onChange={(e)=>setText(e.target.value)} style={{width:'100%',height:"107px"}} type='text'></input>   
    <p className='therepy-headings'>Weekly Rating</p>
    <p style={{color:"#585858"}}>Pick a number to rate your past week, with 10 being the best ever and 1 being the worst.</p>
    
  <div className='radio-input-head' style={{display:'flex'}}>
  {arr.map((num)=>(  <div className='bullet-div'>
  
      <input checked={num==weekly} type="radio" value={num}  onChange={e => setWeekly(e.currentTarget.value)}  name='weekly'>
      </input>
      {num}
      </div>
  ))}
  </div>
  
  <p>Enter a word to describe your previous week:</p>
    <input  onChange={(e)=>setPrevious(e.target.value)} value={previous} style={{width:'100%',height:"107px"}} type='text'></input>   
    <div style={{display:'flex'}} className="tracking_section">
    <div style={{width:"50%"}}>
    <img  src='/images/goals.png'/>
    </div>
    <div style={{width:"50%"}}>
    
    
    
    <p className='therepy-headings'>Select a goal to track
    </p>
    <select
    className="form-control therepy-select"
    style={{width:'40%'}}
      aria-label="Floating label select example"
  
    onChange={e => setSelectedGoal(e.currentTarget.value)}
    >
    <option value="choose" disabled >
    <p>Add or delete multiple Fields according
  to your Goals</p>
    </option>
    {getCountry()}
    </select>
    <p className='therepy-headings'> Rating</p>
    <p style={{color:"#585858"}}>Pick a number between 1 and 10 to denote where you are in relation to achieving your goal. For reference, 1 would be used for the day you set your goal here, and 10 would mean you have achieved it.
    </p>
  
    <div className='radio-input-head' style={{display:'flex'}}>
  {arr.map((num)=>(  <div className='bullet-div'>
  
      <input type="radio"  checked={num==achieved} onChange={e => setAchieved(e.currentTarget.value)} value={num} name='rare'>
      </input>
      {num}
      </div>
  ))}

  </div>
  <button><img src="/images/del.png" alt="my image"  /></button>
    <button onClick={submit}><img src="/images/save.png" alt="my image" /></button>
  </div>
  </div>
  </div>

   <button className='custom_notes'><img src="/images/del.png" alt="my image"  /></button>
   <button className='custom_notes_save' onClick={submit}><img src="/images/save.png" alt="my image" /></button>
   </div>}
 </div>

  )
}

export default Projects