import {
  Fragment,
  useState,
} from 'react';

import axios from 'axios';

import { WeatherCard } from '../WeatherCard/WeatherCard';
import css from './Weather.module.css';

const Weather = () => {
  const [loading, setLoading] = useState(false);
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null); // Changed to null since the response is an object

  const apiKey = '0070c832976c40d98be150905243012';

  const fetchData = async (e) => {
    e.preventDefault();
    if (!city) {
      alert('Please enter a city name!');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.get('https://api.weatherapi.com/v1/current.json', {
        params: {
          key: apiKey, 
          q: city,
        },
      });

      setWeather(response.data); 
    } catch (error) {
      alert('Failed to fetch weather data');
      setWeather(null);
      console.error('Error:', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Fragment>
      <div className={css.container}>
        <form className={css.searchContainer} onSubmit={fetchData}>
          <input
            type="text"
            className={css.searchInput}
            placeholder="Enter city name"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button type='submit' className={css.searchButton}>
            Search
          </button>
        </form>
        {/* No map becuase we are getting single object  */}
        {loading ? (
          <p>Loading data...</p>
        ) : weather ? (
          <div className="weather-cards" style={{display:"flex", gap:50,flexWrap:"wrap", margin:"1rem"}}>
            <WeatherCard title="Temperature" detail={`${weather.current.temp_c}°C`} />
           
            <WeatherCard title="Humidity" detail={`${weather.current.humidity}%`} />
            
            <WeatherCard title="Condition" detail={weather.current.condition.text} />

            <WeatherCard title="Wind Speed" detail={`${weather.current.wind_kph} km/h`} />
          </div>
        ) : (
          <p>No weather available to show. Please search for a city.</p>
        )}
      </div>
    </Fragment>
  );
};

export default Weather;
