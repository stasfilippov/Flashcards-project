import { rtkErrorLogger } from '@/services/middleware/authMiddleware'
import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'

import { appSlice } from './appSlice'
import { flashcardsApi } from './flashcardApi'

export const store = configureStore({
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(flashcardsApi.middleware).concat(rtkErrorLogger),
  reducer: {
    [appSlice.name]: appSlice.reducer,
    [flashcardsApi.reducerPath]: flashcardsApi.reducer,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>

setupListeners(store.dispatch)
