import React,{useState,useEffect} from 'react'

import "./App.css"
import { Route, Routes,useLocation } from 'react-router-dom'
import Calender from './Components/Calender';
import Goals from './Components/Goals';
import Home from './Components/Home';
import Profile from './Components/Profile';
import Stripe from './Components/Stripe';
import Projects from './Components/Projects';
import Sidebar from './Components/Sidebar';
import Footer from './Footer/Footer';
import Navbar from './Header/Navbar';
import Protected from './Components/Protected';
import HomeWork from './Components/HomeWork';
import Notifications from './Components/Notifications';
import detect from 'devtools-detect';
import Symptom from './Components/Symptom';
import Notes from './Components/Notes';
import NotesDisp from './Components/NotesDisp';
import Chart from './Components/Chart';
import TermsAndCondition from './Components/TermsAndCondition';
import Coupon from './Components/Coupon';



const App=()=> {
    
  
  const [isLoggedIn, setisLoggedIn] = useState(null);
  
  const location = useLocation();
  let HomePageStyling ='content-main container-fluid'
  if (location.pathname === '/'||location.pathname === '/termsandconditions') {
    HomePageStyling = '';
}
console.log(detect)


  useEffect(() => {
    
    const token=localStorage.getItem('token')
    if(!token){
      setisLoggedIn(false)
    }
    else
    {
      setisLoggedIn(true)
    }
    //   const id = localStorage.getItem("id")
    // setAccountType(Account)
  }, [isLoggedIn]);

  return (
    <>
     { <Navbar isLoggedIn={isLoggedIn} setisLoggedIn={setisLoggedIn}/>}
     <div className={HomePageStyling}>

      {isLoggedIn && location.pathname != '/termsandconditions' && <Sidebar />}
      <Routes>
        <Route exact path="/" element={<Home isLoggedIn={isLoggedIn} setisLoggedIn={setisLoggedIn}/>}  />
     
        <Route path="/therapy-notes" element={<Protected isLoggedIn={isLoggedIn}> <div className='main'>  <Projects/></div></Protected>}/>
        <Route path="/goals" element={<Protected isLoggedIn={isLoggedIn}> <div className='main'><Goals/></div></Protected>}/>
        <Route path="/Calendar" element={<Protected isLoggedIn={isLoggedIn}><div className='main'><Calender/></div></Protected>}/>
        <Route path="/profile" element={<Protected isLoggedIn={isLoggedIn}><div className='main'><Profile /></div></Protected>}/>
        <Route path="/notification" element={<Protected isLoggedIn={isLoggedIn}><div className='main'><Notifications/></div></Protected>}/>
        <Route path="/symptom-tracking" element={<Protected isLoggedIn={isLoggedIn}><div className='main'><Symptom /></div></Protected>}/>
        <Route path="/homework" element={<Protected isLoggedIn={isLoggedIn}><div className='main'><HomeWork /></div></Protected>}/>
        <Route path="/notes" element={<Protected isLoggedIn={isLoggedIn}><div className='main'><Notes /></div></Protected>}/>
        <Route path="/chart" element={<Protected isLoggedIn={isLoggedIn}><div className='main'><Chart /></div></Protected>}/>
        <Route path="/coupon" element={<Protected isLoggedIn={isLoggedIn}><div className='main'><Coupon /></div></Protected>}/>
        <Route path="/tracking" element={<Protected isLoggedIn={isLoggedIn}><div className='main'><NotesDisp /></div></Protected>}/>
        <Route path="/stripe" element={<Protected isLoggedIn={isLoggedIn}><div className='main'><Stripe /></div></Protected>}/>
        <Route path="/termsandconditions" element={<div><TermsAndCondition /></div>}/>

      </Routes>
      </div>
      <div className='footer-app'><Footer /></div>      
    </>
  );
}
export default App