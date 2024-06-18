import { baseQueryWithReauth } from '@/services/flashcardsBaseQuery'
import { createApi } from '@reduxjs/toolkit/query/react'

export const flashcardsApi = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
  reducerPath: 'flashcardsApi',
  tagTypes: ['Decks', 'Cards', 'Auth'],
})
