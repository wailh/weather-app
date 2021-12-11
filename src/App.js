import React, {useEffect, useState} from 'react'
import SearchBox from './components/forecast/SearchBox'
import WeatherData from './components/forecast/weatherData'
import {ToastContainer, toast} from 'react-toastify'
import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";
import 'react-toastify/dist/ReactToastify.css'
import './App.css'

function App() {
  const  appId = "5239843d55e0b93c4a2d0ed7770b3a28"

  const [weather, setWeather] = useState({})
  const [search, setSearch] = useState('')
  const [query, setQuery] = useState('ferdjioua')
  const [cold, setCold] = useState()

  useEffect(() => {
    getWeather()
  }, [query])


  const getWeather = async () => {
    try {
      const data = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${appId}`)
      const weather = await data.json()
      setWeather(weather)
      setCold(Math.round(weather.main.temp - 273.15))
    }
    catch(ex) {
        Sentry.captureException(ex)
        toast.error('An unexpected error occured, please try with a valid city name')
        setQuery('ferdjioua')
    }
  }
 
  const handleSubmit = (e) => {
    e.preventDefault()
    setQuery(search)
    setSearch('')
  }
  const handleChange = (item) => {
    // the item selected
    setSearch(item)
  }

  const dateBuilder = (d) => {
    let months = ["January", "Fabruary", "march", "April", "May", "June",
    "July", "August", "Septembre", "Octobre", "November","December"]
    let days = ["Sunday", "Monday", "Tuesday", 
    "Wednesday", "Thursday", "Friday", "Saturday"]

    let day = days[d.getDay()]
    let date = d.getDate()
    let month = months[d.getMonth()]
    let year = d.getFullYear()

    return `${day} ${date} ${month} ${year}`
  }

  const getLocation = () => {
    navigator.geolocation.getCurrentPosition(async function(position) {
      const lat = (position.coords.latitude)
      const lon = (position.coords.longitude)
      const data = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${appId}`)
      const weather = await data.json()
      setWeather(weather)
    });
  }

  Sentry.init({
    dsn: "https://60f0eb552bf84d528b69436b90757184@o1085011.ingest.sentry.io/6095428",
    integrations: [new Integrations.BrowserTracing()],

    tracesSampleRate: 1.0,
  });

  return (
    <>
      <div className='App'> 
        <ToastContainer/ >
        <div className={(typeof weather.main != 'undefined') ? ((cold > 20) ? 'appwarm main-section' : 'appcold main-section') : 'main-section'}>
          <SearchBox handleSubmit={handleSubmit} search={search} handleChange={handleChange}/>

          <WeatherData weather={weather} dateBuilder={dateBuilder} getLocation={getLocation}/>
        </div>
      </div>
      <footer>
          <p>&copy; 2021 By Wail_Hamdi</p>
        </footer>
    </>
  )
}

export default App