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
      .addMatcher(
        action => action.type.endsWith('executeQuery/rejected'),
        state => {
          state.appStatus = 'error'
        }
      )
  },
  initialState: {
    appStatus: 'idle' as 'error' | 'idle' | 'loading',
  },
  name: 'app',
  reducers: {},
})

export const appActions = appSlice.actions

export const appReducer = appSlice.reducer
