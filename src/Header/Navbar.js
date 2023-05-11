import React,{useState} from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import "./Navbar.css"
import { Link, useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';

function ColorSchemesExample({isLoggedIn,setisLoggedIn}) {
const navigate=useNavigate()
const [expanded, setExpanded] = useState(false);
  const onLogout=()=>{
    localStorage.clear()
  setExpanded(false)
    setisLoggedIn(false)
navigate("/")
  }
  return (

    <div className='top_nav'>
  
       
      <Navbar expanded={expanded} expand="lg"  >
     <Container fluid>
        <Link className='header-logo-top' to="/"><img src="/images/logo.svg" /></Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={() => setExpanded(!expanded)}/>
        <Navbar.Collapse id="basic-navbar-nav">
      
           
        
             
       {!isLoggedIn ?   <Nav className="me-auto">

       <Link to="/" onClick={() => setExpanded(false)} className="nav-item nav-link px-3">Home</Link>
            <Link to="/therapy-notes" onClick={() => setExpanded(false)} className="nav-item nav-link px-3">Therapy Notes</Link>
            <Link to="/goals" onClick={() => setExpanded(false)} className="nav-item nav-link px-3">Goals</Link>
            <Link to="/profile" onClick={() => setExpanded(false)} className="nav-item nav-link px-3">Profile</Link>
            <Link to="/Calendar" onClick={() => setExpanded(false)} className="nav-item nav-link px-3">Calendar</Link>
           
            <Link to="/homework" onClick={() => setExpanded(false)} className="nav-item nav-link px-3">Homework</Link>
            </Nav>: <Nav className="me-auto"> 
            <div className='mobile-burger'>
            <Link to="/therapy-notes" onClick={() => setExpanded(false)}  className="nav-item nav-link px-3">Therapy Notes<img src='/images/icons/Vector.svg'/></Link>
            <Link to="/goals" onClick={() => setExpanded(false)}  className="nav-item nav-link px-3">Goal<img src='/images/icons/Vector.svg'/></Link>
            <Link to="/profile" onClick={() => setExpanded(false)} className="nav-item nav-link px-3">Profile<img src='/images/icons/Vector.svg'/></Link>
            <Link to="/Calendar" onClick={() => setExpanded(false)}  className="nav-item nav-link px-3">Calendar<img src='/images/icons/Vector.svg'/></Link>
           <Link to="/symptom-tracking" onClick={() => setExpanded(false)} className="nav-item nav-link px-3">Symptom-tracking<img src='/images/icons/Vector.svg'/></Link>
         
           <Link to="/notes" onClick={() => setExpanded(false)}  className="nav-item nav-link px-3">Notes<img src='/images/icons/Vector.svg'/></Link>
           
            <Link to="/homework" onClick={() => setExpanded(false)} className="nav-item nav-link px-3">Homework<img src='/images/icons/Vector.svg'/></Link>
          <Link to="/tracking" onClick={() => setExpanded(false)} className="nav-item nav-link px-3">Tracking<img src='/images/icons/Vector.svg'/></Link>
           </div>

            <Link to="/goals" onClick={() => setExpanded(false)} className="nav-item nav-link px-3 custom-tarcking-burger">Goals</Link>
            <Button onClick={onLogout} className="nav-item nav-link px-3">Logout</Button>   </Nav>}
         
        </Navbar.Collapse>
      </Container>
    </Navbar>
      
   
      
    </div>
  );
}

export default ColorSchemesExample;