import { createSlice } from '@reduxjs/toolkit'

export const appSlice = createSlice({
  extraReducers: builder => {
    builder
      .addMatcher(
        action => action.type.endsWith('executeQuery/pending'),
        state => {
          state.appStatus = 'loading'
        }
      )
      .addMatcher(
        action => action.type.endsWith('executeQuery/fulfilled'),
        state => {
          state.appStatus = 'idle'
        }
      )
  },
  initialState: {
    appStatus: 'idle' as 'idle' | 'loading',
  },
  name: 'app',
  reducers: {},
})

export const appActions = appSlice.actions

export const appReducer = appSlice.reducer
