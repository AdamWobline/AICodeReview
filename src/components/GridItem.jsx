import React from 'react';
import { Link } from 'react-router-dom'

const GridItem = ({ city }) => {
  const { name, country, description, image } = city

  const style = image
    ? { backgroundImage: `linear-gradient(rgba(1,2,2,0),rgba(1,2,2,.95)), url(${image})` }
    : {}

  return(
    <div className="GridItem" style={style}>
      <Link to={`/cities/${city.id}`} className="d-inline mb-1">
        <span className="GridItem__Title">{ name }</span>
        <span className="GridItem__Subtitle">{ country }</span>
      </Link>
      <div className="GridItem__Text">
        <p>{ description }</p>
      </div>
    </div>
  )
}

export default GridItem