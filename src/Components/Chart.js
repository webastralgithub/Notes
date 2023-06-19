import React,{useState,useEffect,useLayoutEffect, useRef } from 'react'
import MiniHeader from './MiniHeader'
import axios from 'axios'
import {
    LineChart,
    ResponsiveContainer,
    Legend, Tooltip,
    Line,
    XAxis,
    YAxis,
    CartesianGrid
} from 'recharts';

const year = new Date().getFullYear();
const years = Array.from(new Array(15),(val, index) =>  year-index);
 const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];
const weeks = [
 1,2,3,4,5
];
const Chart = () => {
    const[view,setView]=useState()
    const[goals,setGoals]=useState([])
     const[keyName,setKeyName]=useState()
    const[selectedData,setSelectedData]=useState({})
    const[chartData,setChartData]=useState([])
    const selected=useRef('')
    const selectedWeek=useRef('')
    console.log(years)

const url=process.env.REACT_APP_API_KEY
useLayoutEffect(() => {

 getGoals()

}, []);

const handlesubmit=async()=>{
var val;
if(view==1){
 val='year'
}
else
val='yearwithmonth'
 const res = await axios.post(`${url}/symptom_tracking_by_date/${selected.current.value}`,{
   
  ...selectedData,tabValue:val},config);
  console.log(view)

if(view==1){
setKeyName('month')
convert(res.data);
}

  if(view==2){
    setKeyName('week')
    setChartData(res.data);
  } if(view==3){
    setKeyName('day')
 
    const keyValue = (input) => Object.entries(input).map(([key,value]) => {
    return {
    day:key,
    rating:value
      }
    })
   
  setChartData(keyValue(res.data[selectedWeek.current.value].daily));
 }
}
const token =JSON.parse(localStorage.getItem('token'));
let config = {
  headers: {
    'Authorization': `Bearer ${token}`
  }
}


function convert(data){
data.forEach((element, index) => {
   
        data[index].month = new Date(data[index].month+'-1-01').getMonth()+1;
        console.log(new Date(data[index].month+'-1-01').getMonth()+1,"Dfdfafdaaf")
    console.log( data[index].month,"Dfdfafdaaf")
});
console.log(chartData)
var prevRating=0

for (var i = 1; i <= 12; i++) {
  var existObj = data.find(item => +item.month === i);
if(existObj){
  prevRating=existObj.rating
}
  if (!existObj) {
    data.push({
      'month': i,
      'rating': prevRating
    });
  }
}
data.sort(function(a, b) {
  return +a.month - +b.month;
});
//console.log(data);

data.forEach((element, index) => {
   
        data[index].month = toMonthName(data[index].month);
    
});

   
setChartData(data)

}
const handleMonthSelect = (e) => {
  const { value } = e.target;
  const month = parseInt(value, 10);
  setSelectedData({...selectedData,month:month+1});
}
const handleYearSelect = (e) => {
  const { value } = e.target;
  setSelectedData({...selectedData,year:value});
 
};

function toMonthName(monthNumber) {
  const date = new Date();
  date.setMonth(monthNumber - 1);

  return date.toLocaleString('en-US', {
    month: 'short',
  });
}





const getGoals=async()=>{
 
    const rest = await axios.get('https://ipapi.co/timezone')
      console.log(rest.data);
   
        const res = await axios.get(`${url}/symptom`,config);
        setGoals(res.data.data);
        console.log(res.data.data);
  }




const getCountry=()=> {
    return goals.map((goal) => {
      return <option  value={goal.id}>{goal.title} 
             </option>;
    });
  }





  return (
    <div>
    <div >
    <div style={{paddingBottom:'30px'}}>
    <MiniHeader head='Symptoms' />
    </div>
    <div>
    <div style={{gap:"10%",marginBottom:"5%"}}><div className='input-head' style={{width:"48%"}}>
    <select
    className="form-control"
    ref={selected}
    aria-label="Floating label select example"
    >
    <option value="choose" disabled selected="selected">
    <p>Select Symptom</p>
    </option>
    {getCountry()}
    </select>
    </div>
    <div style={{width:"100%"}} className="chart_options">
    <div className="custom_btn">
    <button className="button" onClick={() => setView(1)}>Year</button>
    <select 
    className="form-control"
    
    aria-label="Floating label select example"
    onChange={handleYearSelect}>
    
    {years.map((year, index) => (
      <option key={`year${index}`} value={year}>{year}</option>))}
      </select>
    </div>
    <div className="custom_btn">
    <button className="button" onClick={() =>setView(2)}>Month</button>
    <select
    className="form-control"
  
    aria-label="Floating label select example"
    onChange={handleMonthSelect}>
    {months.map((key, index) => (
      <option value={index} key={index}>
        {key}
      </option>
    ))}
  </select>
  </div>
  <div className="custom_btn">
    <button className="button"  onClick={() =>setView(3)}>Week</button>
    <select
    className="form-control"
  ref={selectedWeek}
    aria-label="Floating label select example"
    >
    {weeks.map((key, index) => (
      <option value={index} key={index}>
        {key}
      </option>
    ))}
  </select>
    </div>
    <div className="custom_btn">
    <button className="button"  onClick={() =>handlesubmit()}>Go</button>
    </div>
    </div>
    </div>
    <ResponsiveContainer width="100%" height="100%" aspect={3}>
                <LineChart data={chartData} margin={{ right: 300 }}>
                    <CartesianGrid />
                    <XAxis dataKey={keyName} 
                        />
                    <YAxis   type="number" domain={[0,10]} tickCount={10} ></YAxis>
   
                    <Tooltip />
                 
                    <Line dataKey="rating"
                    
                        stroke="red" activeDot={{ r: 8 }} />
                </LineChart>
     
                </ResponsiveContainer>
                Symptom Name
            </div>
            </div>
    </div>
  )
}

export default Chart