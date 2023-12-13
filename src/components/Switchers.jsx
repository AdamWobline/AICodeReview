import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { setSort } from '../reducers/sortReducer'
import { setUnit } from '../reducers/unitReducer'

const Switchers = () => {
  const dispatch = useDispatch()
  const sort = useSelector(state => state.sort)
  const unit = useSelector(state => state.unit)

  return (
    <div className="Switchers">
      <div className="Switcher">
        <span className="Switcher__Title">Sort by</span>
        <div>
            <span
              className={ sort === 'name' ? "Switcher__Btn Switcher__Btn--Active" : "Switcher__Btn" }
              role="button"
              onClick={() => dispatch(setSort('name'))}
            > Name</span>
          <span className="px-1">|</span>
          <span
            className={ sort === 'distance' ? "Switcher__Btn Switcher__Btn--Active" : "Switcher__Btn" }
            role="button"
            onClick={() => dispatch(setSort('distance'))}
          >Distance</span>
        </div>
      </div>
      <div className="Switcher">
        <span className="Switcher__Title">Units</span>
        <div>
          <span
            className={ unit === 'celsius' ? "Switcher__Btn Switcher__Btn--Active" : "Switcher__Btn" }
            role="button"
            onClick={() => dispatch(setUnit('celsius'))}
          >°С</span>
          <span className="px-1">|</span>
          <span
            className={ unit === 'fahrenheit' ? "Switcher__Btn Switcher__Btn--Active" : "Switcher__Btn" }
            role="button"
            onClick={() => dispatch(setUnit('fahrenheit'))}
          >°F</span>
        </div>
      </div>
    </div>
  )
}

export default Switchers
