import { createSlice } from '@reduxjs/toolkit'

const paginationSlice = createSlice({
  name: 'pagination',
  initialState: 20,
  reducers: {
    setPagination(state, action) {
      return action.payload
    }
  },
})

export const { setPagination } = paginationSlice.actions

export default paginationSlice.reducer
