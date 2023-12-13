import React from 'react';
import { useSelector } from 'react-redux'
import GridItem from './GridItem';
import { selectorFilteredCities } from '../reducers/cityReducer'

const GridItems = () => {
  const cities = useSelector(state => selectorFilteredCities(state))

  if (!cities) {
    return <span className="px-2">...</span>
  }

  if (!cities.length) {
    return <span className="px-2">Nothing found...</span>
  }

  return (
    <div className="GridItems">
      { cities.map(city => <GridItem key={city.id} city={city} />) }
    </div>
  )
}

export default GridItems