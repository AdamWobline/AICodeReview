import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import weatherService from '../services/weather'
import {useSelector} from 'react-redux';
import Forecast from './Forecast';
import Weather from './Weather';
import moment from 'moment';

const City = ({ city }) => {
  const [weather, serWeather ] = useState(null)
  const [forecast, serForecast ] = useState(null)
  const unit = useSelector(state => state.unit)
  const units = unit === 'celsius' ? 'metric' : 'imperial'

  useEffect(() => {
    // Note: `Current weather and forecast` request combined is Pro feature
    // So have to do second request after the `5 day / 3 hour forecast data`
    if (city?.name) {
      // Current weather
      weatherService.fetch(city?.name, units).then((res) => {
        serWeather(res)
      })

      // Forecast
      weatherService.getForecast(city?.name, units).then((res) => {
        serForecast(res)
      })
    }
  }, [city])

  if (!weather) {
    /* Loader */
    return (
      <div className="container">
        <div className="p-1">
          <Link to="/"> Back</Link>
          <p>...</p>
        </div>
      </div>
    )
  }

  if (!weather?.data) {
    /* No data from API */
    return (
      <div className="container">
        <div className="p-1">
          <Link to="/"> Back</Link>
          <p>Nothing here...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container container-md">
      <div className="Heading">
        <Link to="/">&#60; Back</Link>
      </div>

      <Weather data={ transferWeatherData(weather?.data, unit) } />
      { forecast?.data ? <Forecast data={ transferForecastData(forecast?.data, unit) } /> : null }
    </div>
  )
}

export default City

/**
 * Turn weather API data into proper data structure for output in the component
 * @param data
 * @param unit
 * @returns {{date: string, imgUrl: string, country: string | string, tempFeels: string, name: (*|string), temperature: string, description: string}}
 */
const transferWeatherData = (data, unit) => {
  const icon = data?.weather?.[0]?.icon ?? ''
  const temp = data?.main?.temp ? Number((data?.main?.temp).toFixed()) : ''
  const units = unit === 'celsius' ? '°С' : '°F'
  const tempFeels = data?.main?.feels_like ? Number((data?.main?.feels_like).toFixed()) : ''
  const description = data?.weather?.[0]?.description
    ? data?.weather?.[0]?.description.charAt(0).toUpperCase() + data?.weather?.[0]?.description.slice(1)
    : ''

  return {
    date: moment().format("MMM DD, HH:mm"),
    name: data?.name ?? '',
    country: data?.sys?.country ?? '',
    imgUrl: `https://openweathermap.org/img/wn/${icon}@2x.png`,
    temperature: `${temp}${units}`,
    tempFeels: `${tempFeels}${units}`,
    description
  }
}

/**
 * Turn weather forecast API data into proper data structure for output in the component
 * @param data
 * @param unit
 * @returns {Array}
 */
const transferForecastData = (data, unit) => {
  let items = []

  if (data?.list && Array.isArray(data?.list)) {
    data?.list.forEach(listItem => {
      // API returns weather data with 3 hours interval for each day.
      // Take only one entry per day at noon
      if (listItem?.dt_txt && listItem?.dt_txt.includes('12:00:00')) {
        const icon = listItem?.weather?.[0]?.icon ?? ''
        const description = listItem?.weather?.[0]?.description
          ? listItem?.weather?.[0]?.description.charAt(0).toUpperCase() + listItem?.weather?.[0]?.description.slice(1)
          : ''
        const tempMax = listItem?.main?.temp_max ? Number((listItem?.main?.temp_max).toFixed()) : ''
        const tempMin = listItem?.main?.temp_min ? Number((listItem?.main?.temp_min).toFixed()) : ''
        const units = unit === 'celsius' ? '°С' : '°F'

        const item = {
          id: listItem?.dt,
          date: moment(listItem?.dt_txt).format("ddd MMM DD"),
          imgUrl: `https://openweathermap.org/img/wn/${icon}@2x.png`,
          tempMax,
          tempMin,
          units,
          description
        }

        items.push(item)
      }
    })
  }

  return items
}
