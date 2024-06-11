import { flashcardsApi } from '@/services/flashcardApi'

import { DecksListResponse, GetDecksArgs } from './decksApi.types'

const decksApi = flashcardsApi.injectEndpoints({
  endpoints: builder => {
    return {
      getDecks: builder.query<DecksListResponse, GetDecksArgs | void>({
        query: args => {
          return {
            method: 'GET',
            params: args ?? undefined,
            url: 'v2/decks',
          }
        },
      }),
    }
  },
})

export const { useGetDecksQuery } = decksApi
