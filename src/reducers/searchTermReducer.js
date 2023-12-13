import { createSlice } from '@reduxjs/toolkit'

const searchTermSlice = createSlice({
  name: 'searchTerm',
  initialState: '',
  reducers: {
    setTerm(state, action) {
      return action.payload
    }
  },
})

export const { setTerm } = searchTermSlice.actions

export default searchTermSlice.reducer
