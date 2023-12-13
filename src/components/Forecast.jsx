import React from 'react';

const Forecast = ({ data }) => {
  if (!data || !Array.isArray(data)) {
    return null
  }

  const ForecastItem = ({item}) => {
    return (
      <div className="Forecast_Item">
        {item.date}
        <div className="Forecast_Details">
          <img src={item.imgUrl} width="50" height="50" alt="weather icon"/>
          { item.tempMax} / { item.tempMin }{item.units}
        </div>
        <span>{item.description}</span>
      </div>
    )
  }

  return (
    <div className="Forecast">
      <h2>5-day forecast</h2>
      <div className="Forecast_Items">
        { data.map(item => <ForecastItem key={item.id} item={item} />)}
      </div>
    </div>
  )
}

export default Forecast