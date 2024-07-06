import { appSlice } from '@/services/appSlice/appSlice'
import { flashcardsApi } from '@/services/flashcardApi'
import { rtkErrorLogger } from '@/services/middleware/authMiddleware'
import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'

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
