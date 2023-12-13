import { configureStore } from '@reduxjs/toolkit'

import cityReducer from './reducers/cityReducer'
import searchTermReducer from './reducers/searchTermReducer'
import filterReducer from './reducers/filterReducer'
import sortReducer from './reducers/sortReducer'
import unitReducer from './reducers/unitReducer'
import paginationSlice from './reducers/paginationReducer'

const store = configureStore({
  reducer: {
    cities: cityReducer,
    searchTerm: searchTermReducer,
    filter: filterReducer,
    sort: sortReducer,
    unit: unitReducer,
    pagination: paginationSlice,
  }
})

export default store
