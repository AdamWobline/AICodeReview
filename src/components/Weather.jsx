import React from 'react';

const Weather = ({ data }) => {
  if (!data) {
    return null
  }

  return (
    <div className="Weather">
      <div className="Weather__Header">
        <span>{data.date}</span>
        <h1>{data.name}, {data.country}</h1>
      </div>

      <div className="Weather__Details">
        <img src={data.imgUrl} width="100" height="100" alt="weather icon"/>
        <span>{data.temperature}</span>
      </div>

      <div className="Weather__Status">
        <strong>Feels like {data.tempFeels}. {data.description}</strong>
      </div>
    </div>
  )
}

export default Weather
