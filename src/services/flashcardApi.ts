import { createApi } from '@reduxjs/toolkit/query/react'

import { baseQueryWithReauth } from './flashcardsBaseQuery'

export const flashcardsApi = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
  reducerPath: 'flashcardsApi',
  tagTypes: ['Decks', 'Cards', 'Auth', 'MinMaxCards'],
})
