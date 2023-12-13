import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { selectorContinentOptions } from '../reducers/cityReducer'
import { setFilter } from '../reducers/filterReducer'
import { setTerm } from '../reducers/searchTermReducer'
import Switchers from './Switchers';

const Toolbar = () => {
  const dispatch  = useDispatch()
  const options   = useSelector(state => selectorContinentOptions(state))

  return (
    <div className="Toolbar">
      <div className="FormGroup">
        <label className="mb-1" htmlFor="search">Search</label>
        <input
          id="search"
          type="search"
          className="FormControl"
          placeholder="Type to search"
          onChange = {e => dispatch(setTerm(e.target.value.trim()))}
        />
      </div>
      <div className="FormGroup">
        <label className="mb-1" htmlFor="continent">Continent</label>
        <select
          id="continent"
          className="FormControl"
          onChange={e => dispatch(setFilter(e.target.value))}
        >
          <option value="ALL"> </option>
          { options.map((option, i) => <option key={i} value={option}>{option}</option> )}
        </select>
      </div>

      <Switchers />
    </div>
  )
}

export default Toolbar
