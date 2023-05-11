import React, { useState,useEffect } from 'react'

import { Link } from 'react-router-dom'
import "./Sidebar.css"
const Sidebar = () => {
const [user,setUser]=useState(null)
  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user_details")))
    
  }, [])
  console.log(user)
  return (
    <div className='sidenav'>
      {user &&<div className='side-bar-user-icon'>
      <img src={`https://kate.nvinfobase.com/storage/${user.image}`}/>
      <p>Hey! , <span>{user.name}</span></p>
      </div>}
    <Link to="/therapy-notes" className="nav-item nav-link px-3">Therapy Notes<img src='/images/icons/Vector.svg'/></Link>
   
    </div>
  )
}

export default Sidebar