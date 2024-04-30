import { useState, useEffect } from 'react'
import rainLogo from './assets/rain.png'
import searchLogo from './assets/search.png'
import drizzleLogo from './assets/drizzle.png'
import windLogo from './assets/wind.png'
import mistLogo from './assets/mist.png'
import humidityLogo from './assets/humidity.png'
import snow from './assets/snow.png'
import clearLogo from './assets/clear.png'
import cloudLogo from './assets/clouds.png'
import './App.css'

function App() {
  const [keyword, setkeyword] = useState("");
  const [city, setCity] = useState("");
  const [Name, setName] = useState("");
  const [temp, setTemp] = useState();
  const [wind, setwind] = useState();
  const [humidity, sethumidity] = useState();
  const [Img, setImg] = useState("");
  const [display, setDisplay] = useState("not_weather");

  async function Fetch() {
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=`;
      let apiId ="Key"
      let res = await fetch(url + apiId +"&units=metric");
      let data = await res.json();
      if (data.cod === '404') {
        alert("Enter Valid City Name");
        setDisplay("not_weather");
      }
      else {
        let temperature = Math.floor(data.main.temp);
        let humidity = data.main.humidity;
        let wind = data.wind.speed;
        let name = data.name;
        setName(name);
        setTemp(temperature);
        // console.log(temperature);
        sethumidity(humidity);
        setwind(wind);
        if (data.weather[0].main == "Clouds") {
          setImg(cloudLogo);
        } else if (data.weather[0].main == "Clear") {
          setImg(clearLogo);
        } else if (data.weather[0].main == "Snow") {
          setImg(snow);
        } else if (data.weather[0].main == "Rain") {
          setImg(rainLogo);
        } else if (data.weather[0].main == "Drizzle") {
          setImg(drizzleLogo);
        } else if (data.weather[0].main == "Mist") {
          setImg(mistLogo);
        }
        setDisplay("weather");
      }
    }
    catch (e) {
      console.log(e);
    }
  }

  const handleChange = (e) => {
    setkeyword(e.target.value);
  }
  const submitBtn = () => {
    setCity(keyword);

  }

  useEffect(() => {
    if (city !== "") {
       Fetch();
    }
  }, [city])

  return (
    <div className="card">
      <div className="search">
        <input value={keyword} onChange={handleChange} type="text" placeholder="Enter City Name" />
        <button onClick={submitBtn}><img src={searchLogo} /></button>
      </div>
      <div className={display}>
        <img src={Img} className="weather-icon" />
        <h1 className="temp">{temp + "°c"}</h1>
        <h1 className="city">{Name}</h1>
        <div className="details">
          <div className="col">
            <img src={humidityLogo} alt="humidity" />
            <div>
              <p className="humidity">{humidity + "%"}</p>
              <p>Humidity</p>
            </div>
          </div>
          <div className="col">
            <img src={windLogo} alt="wind" />
            <div>
              <p className="wind">{wind + "km/h"}</p>
              <p>Wind Speed</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
