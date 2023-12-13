import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Routes, Route, useMatch } from 'react-router-dom'

import Main from './components/Main';
import City from './components/City';
import { initCities } from './reducers/cityReducer'

const App = () => {
  const dispatch = useDispatch()
  const cities = useSelector(state => state.cities)
  const match = useMatch('/cities/:id')

  const city = match ? cities.find(city => city.id === Number(match.params.id)) : null

  useEffect(() => {
    dispatch(initCities())
  }, [])

  return (
    <main>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/cities/:id" element={<City city={city} />} />
      </Routes>
    </main>
  )
}

export default App
