import { createSlice, createSelector } from '@reduxjs/toolkit'
import citiesService from '../services/cities'
import { calcDistanceToTelAviv } from '../utils'

const citySlice = createSlice({
  name: 'cities',
  initialState: [],
  reducers: {
    setCities(state, action) {
      return action.payload
    }
  },
})

export const { setCities } = citySlice.actions

export const initCities = () => {
  return async dispatch => {
    let cities = []
    let { data } = await citiesService.getAll()

    if (data) {
      cities = data

      // Check if `distance` prop was set. Do update collection items with new prop, if wasn't set
      if (!cities[0]?.distance) {
        cities = cities.map(city => {
          city.distance = calcDistanceToTelAviv(city.coords)
          return city
        })
      }
    }

    dispatch(setCities(cities))
  }
}

export default citySlice.reducer


/*** Deriving Data with Selectors ***/

/* Store data Selectors */
const selectCities  = (state) => state.cities
const selectFilter  = (state) => state.filter
const selectTerm    = (state) => state.searchTerm
const selectSort    = (state) => state.sort
const selectPagination = (state) => state.pagination

/** Prepare `Cities` collection **/
const createSelectorArgs = [
  selectCities,
  selectFilter,
  selectTerm,
  selectSort,
  selectPagination,
]

/**
 * Memoized selectors for optimization
 * @see: https://redux.js.org/usage/deriving-data-selectors
 * @type {SelectorArray}
 */
export const selectorFilteredCities = createSelector(createSelectorArgs, (cities, filter, term, sort, pagination) => {
  /* Filter by `active` prop */
  let filteredCities = filterByActive(cities)

  /* Filter by search term */
  filteredCities = filterBySearchTerm(filteredCities, term)

  /* Filter by `continent` property */
  if (filter) {
    filteredCities = filterByContinent(filteredCities, filter)
  }

  /* Sort by name|distance*/
  if (sort) {
    filteredCities = sortCities(filteredCities, sort)
  }

  /* Limit items per page */
  if (filteredCities.length > pagination) {
    filteredCities = filteredCities.slice(0, pagination);
  }

  return filteredCities
})

const filterByActive = (cities) => {
  return cities.filter(city => city.active)
}

const filterBySearchTerm = (cities, term) => {
  if (term.trim().length > 0) {

    return cities.filter(city => {
      const nameMatch = city.name.toLowerCase().includes(term.toLowerCase());
      const countryMatch = city.country.toLowerCase().includes(term.toLowerCase());

      // Return true if either name or country matches the search term
      return nameMatch || countryMatch;
    })
  }

  return cities
}

const filterByContinent = (cities, filter) => {
  if (filter === 'ALL') {
    return cities
  }

  return cities.filter(city => city.continent === filter)
}

const sortCities = (cities, sortBy) => {
  /* By country `name` */
  if (sortBy === 'name') {
    return cities.sort((a, b) => {
      const nameA = a.name.toLowerCase()
      const nameB = b.name.toLowerCase()

      if (nameA < nameB) {
        return -1 // If nameA should come before nameB, return a negative value
      }
      if (nameA > nameB) {
        return 1 // If nameA should come after nameB, return a positive value
      }

      return 0 // If names are equal, return 0
    });
  }

  /* By country `distance` */
  if (sortBy === 'distance') {
    return cities.sort((a, b) => {
      if (a.distance < b.distance) return -1
      if (b.distance > a.distance) return 1

      return 0
    });
  }

  return cities
}


/** Derive `continent` prop items for select input options **/
export const selectorContinentOptions = createSelector([selectCities], (cities) => {
  const continents = cities.reduce((accumulator, { continent }) => {
    if (continent && !accumulator.includes(continent)) {
      accumulator.push(continent)
    }

    return accumulator
  }, [])

  return continents.sort()
})
