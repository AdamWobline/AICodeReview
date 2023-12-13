import axios from 'axios'

/**
 * OpenWeather API
 * https://openweathermap.org/
 *
 * @see docs: https://openweathermap.org/api
 * @type {string}
 */

const baseUrl = 'https://api.openweathermap.org/data/2.5'
const appId = import.meta.env.VITE_WEATHER_API_KEY

/**
 * Current Weather Data
 *
 * @param city
 * @param units
 * @returns {Promise<{data: boolean}>}
 */
const fetch = async (city, units = 'metric') => {
  const result  = { data: false }
  const url     = `${baseUrl}/weather?q=${city}&appid=${appId}&units=${units}`

  try {
    const response = await axios.get(url)

    if (response.data.name) {
      result.data = response.data
    }
  } catch (e) {
    console.log(`Caught: ${e}`);
  }

  return result
}

/**
 * 5 Day / 3 Hour Forecast
 * @param city
 * @param units
 * @returns {Promise<{data: boolean}>}
 */
const getForecast = async (city, units = 'metric') => {
  const result  = { data: false }
  const url     = `${baseUrl}/forecast?q=${city}&appid=${appId}&units=${units}`

  try {
    const response = await axios.get(url)

    if (response.data.cod === '200') {
      result.data = response.data
    }
  } catch (e) {
    console.log(`Caught: ${e}`);
  }

  return result
}

export default { fetch, getForecast }