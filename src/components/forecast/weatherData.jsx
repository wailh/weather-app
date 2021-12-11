import React from 'react'

const WeatherData = ({weather, dateBuilder, getLocation}) => {
   return (
       (typeof weather.main != "undefined") ? (
           <main className='info-section'>
             <p className='par-location' onClick={() => getLocation()}><i className='fa fa-map-marker location' />Show My Location</p>
             <div className= 'date'>
               <h2>Weather in {weather.name}, {weather.sys.country}</h2>
               <h3>{dateBuilder(new Date())}</h3>
             </div>
             <div className='hour'>
                <span className='sunrise-hour'>Sunrise: {(new Date(weather.sys.sunrise * 1000)).toLocaleTimeString()}</span>
                <span className='sunset-hour'>Sunset: {(new Date(weather.sys.sunset * 1000)).toLocaleTimeString()}</span>
             </div>
             <div className="degree ">
                <div className='main-degree'>
                  {Math.round(weather.main.temp - 273.15)}°C
                </div> 
                <div className='degree-limits'>
                   <span className='temp-min'>min-temp: {Math.round(weather.main.temp_min - 273.15)}°C</span>
                   <span className='temp-max'>max-temp: {Math.round(weather.main.temp_max - 273.15)}°C</span>
                </div>
             </div>
             <div className='status'>
               <img src ={`http://openweathermap.org/img/w/${weather.weather[0].icon}.png`} alt='no data'/>
               {weather.weather[0].main} 
             </div>
             <div className='wind'>Wind speed: {weather.wind.speed} km/h</div>
             <div className='humidity'>Humidity: {weather.main.humidity}%</div>
             
           </main>
         ) : ('')
   )}

export default WeatherData;