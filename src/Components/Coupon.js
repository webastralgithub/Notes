import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import MiniHeader from './MiniHeader'

const Coupon = () => {
    const[couponData,setCouponData]=useState([])
    
    const selected=useRef('');


    const url=process.env.REACT_APP_API_KEY

const token =JSON.parse(localStorage.getItem('token'));
let config = {
  headers: {
    'Authorization': `Bearer ${token}`
  }
}
   useEffect(()=>{
    const promocode=localStorage.getItem('promocode')
   console.log(promocode)
      setCouponData(JSON.parse(promocode))
   },[])

   const getCoupon=()=> {
    return couponData?.map((coupon) => {
      return <option  value={coupon.coupon.id}>{coupon.coupon.code} 
             </option>;
    });
  } 

    const submit= async()=>{
      console.log(selected.current.value);
      const id=selected.current.value
      const res = await axios.get(`${url}/applyCoupon/${id}`,config);
    }
  return (
    <div>
     <MiniHeader head='Coupon' />
     <div className='input-head first-input'>
<span className='goal-span'>ADD</span>

<select
  className="form-control"
  ref={selected}
  aria-label="Floating label select example"
  >
  <option value="choose" disabled selected="selected">
  <p>Select a promocode</p>
  </option>
  {getCoupon()}
  </select>

<button className='goal-btn' onClick={submit}>Add</button>
</div>
    </div>
  )
}

export default Coupon
