import React,{useState,useEffect} from 'react'

import "./App.css"
import { Route, Routes,useLocation } from 'react-router-dom'

import Home from './Components/Home';

import Projects from './Components/Projects';
import Sidebar from './Components/Sidebar';

import Navbar from './Header/Navbar';
import Protected from './Components/Protected';

import detect from 'devtools-detect';




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
       

      </Routes>
      </div>
     
    </>
  );
}
export default App