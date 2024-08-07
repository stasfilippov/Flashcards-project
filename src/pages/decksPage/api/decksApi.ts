import { GetDeckByIdArgs, GetDeckByIdResponse } from '@/pages/cardsPage/api'
import { flashcardsApi } from '@/services/flashcardApi'

import {
  CreateDeckArgs,
  CreateUpdateDeckResponse,
  DecksListResponse,
  GetDecksArgs,
  MinMaxCardsResponse,
  RemoveDeckResponse,
  RemoveItemArgs,
  UpdateDeckArgs,
} from './decksApi.types'

const decksApi = flashcardsApi.injectEndpoints({
  endpoints: builder => {
    return {
      createDeck: builder.mutation<CreateUpdateDeckResponse, CreateDeckArgs>({
        invalidatesTags: ['Decks'],
        query: ({ cover, isPrivate, name }) => {
          const formData = new FormData()

          formData.append('name', name)

          if (isPrivate) {
            formData.append('isPrivate', isPrivate.toString())
          }

          if (cover) {
            formData.append('cover', cover)
          } else if (cover === null) {
            formData.append('cover', '')
          }

          return {
            body: formData,
            method: 'POST',
            url: 'v1/decks',
          }
        },
      }),
      getDeckById: builder.query<GetDeckByIdResponse, GetDeckByIdArgs>({
        providesTags: ['Decks'],
        query: ({ id }) => ({
          method: 'GET',
          url: `/v1/decks/${id}`,
        }),
      }),
      getDecks: builder.query<DecksListResponse, GetDecksArgs | void>({
        providesTags: ['Decks'],
        query: args => {
          return {
            method: 'GET',
            params: args ?? undefined,
            url: 'v2/decks',
          }
        },
      }),
      getMinMaxCards: builder.query<MinMaxCardsResponse, void>({
        providesTags: ['MinMaxCards'],
        query: () => ({
          method: 'GET',
          url: '/v2/decks/min-max-cards',
        }),
      }),
      removeDeck: builder.mutation<RemoveDeckResponse, RemoveItemArgs>({
        invalidatesTags: ['Decks'],
        query: ({ id }) => {
          return {
            method: 'DELETE',
            url: `v1/decks/${id}`,
          }
        },
      }),
      updateDeck: builder.mutation<CreateUpdateDeckResponse, UpdateDeckArgs>({
        invalidatesTags: ['Decks'],
        query: ({ cover, id, isPrivate, name }) => {
          const formData = new FormData()

          if (name) {
            formData.append('name', name)
          }

          if (isPrivate) {
            formData.append('isPrivate', isPrivate.toString())
          }

          if (cover) {
            formData.append('cover', cover)
          } else if (cover === null) {
            formData.append('cover', '')
          }

          return {
            body: formData,
            method: 'PATCH',
            url: `v1/decks/${id}`,
          }
        },
      }),
    }
  },
})

export const {
  useCreateDeckMutation,
  useGetDeckByIdQuery,
  useGetDecksQuery,
  useGetMinMaxCardsQuery,
  useRemoveDeckMutation,
  useUpdateDeckMutation,
} = decksApi
