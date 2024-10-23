import React, { useEffect, useState } from 'react'
import "./css/style.css"
import axios from "axios"
const Tempapp = () => {
    const [city, setCity] = useState(null);
    const [search, setSearch] = useState();
    const [latitude, setLatitude] = useState();
    const [longitude, setLongitude] = useState();
    // const [icon, setIcon] = useState();
    useEffect(() => {
      // const fetchApi=async ()=>{
        const url=`https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=3ae14e2be12a88798b6e3e0c53723dcf`
        axios.get(url)
        .then((res)=>setCity(res.data))
        // .then(console.log(city),[search])
        .catch((err)=>{setCity()})
      
      //     const response=await fetch(url);
      //   const resJson=await response.json();
      //   setCity(resJson);
      //   console.log(resJson);
      // }
      // fetchApi();
    });
    

    
    


  return (
    <div>
      <div className='box'>
      <div className='in-out'>
      <div className='inputData'>
      
      <button className='currLoc'
      onClick={
        () => {
      navigator.geolocation.getCurrentPosition((position)=>{
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
      })

      let finalAPI=`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=3ae14e2be12a88798b6e3e0c53723dcf`
      axios.get(finalAPI)
      .then((response)=>{
        
        setSearch(response.data.name);
      })
      .catch((err)=>{
        setCity()
      })

    }
      }
      >Use Current Location</button>
      <input 
      type='search'
      className='inputField'
      placeholder='Enter Place Name'
      value={search}
      onChange={(event)=>{setSearch(event.target.value)}}
      />
      </div>

      <div className='details'><h2 className='wd'>Weather Details</h2>
      {city ? (
        <div className='weather-det'>
          <h3>{`Feels like: ${(city.main.feels_like).toFixed(1)} °C`}</h3>
          <h3>{`Wind Speed: ${(city.wind.speed).toFixed(1)} km/h`}</h3>
          <h3>{`Humdity: ${(city.main.humidity)} %`}</h3>
          <h3>{`Pressure: ${(city.main.pressure)} hPa`}</h3>
          <h3>{`Visibility: ${((city.visibility)/1000)} km`}</h3>



      </div>
      
      ):(<p className='err'>Can't Fetch Details</p>)}
      </div>
      </div>

      {city ? (


        <div className='info'>
      <h2 className='location'><i className="fa-sharp fa-solid fa-location-dot fa-beat"></i>   {search}
      </h2>
      <h3 className='temp'> 
      <div className='temperature'>{(city.main.temp).toFixed(1)}</div>
      <div className='wc'>
      <div className='celsius'>°C</div>
      <div className='weather'>{city.weather[0].main}</div>
      </div>

      <div className='icons'>
      </div>
      </h3>
      </div>
      
      ):(<p className='err'>city not found</p>)}

    </div>
    </div>
      
  )
}

export default Tempapp

