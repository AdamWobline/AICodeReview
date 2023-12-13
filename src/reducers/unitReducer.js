import { createSlice } from '@reduxjs/toolkit'

const unitSlice = createSlice({
  name: 'unit',
  initialState: 'celsius',
  reducers: {
    setUnit(state, action) {
      return action.payload
    }
  },
})

export const { setUnit } = unitSlice.actions

export default unitSlice.reducer
