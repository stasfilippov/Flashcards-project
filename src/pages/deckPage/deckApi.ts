import {
  GetCardsArgs,
  GetCardsResponse,
  GetDeckByIdArgs,
  GetDeckByIdResponse,
} from '@/pages/deckPage/deckApi.types'
import { flashcardsApi } from '@/services/flashcardApi'

const deckApi = flashcardsApi.injectEndpoints({
  endpoints: builder => ({
    getCards: builder.query<GetCardsResponse, GetCardsArgs>({
      providesTags: ['Deck'],
      query: ({ id, ...args }) => ({
        method: 'GET',
        params: args ?? undefined,
        url: `/v1/decks/${id}/cards`,
      }),
    }),
    getDeckById: builder.query<GetDeckByIdResponse, GetDeckByIdArgs>({
      providesTags: ['Deck'],
      query: ({ id }) => ({
        method: 'GET',
        url: `/v1/decks/${id}`,
      }),
    }),
  }),
})

export const { useGetCardsQuery, useGetDeckByIdQuery } = deckApi
