import { flashcardsApi } from '@/services/flashcardApi'

import {
  CreateDeckArgs,
  CreateUpdateDeckResponse,
  DecksListResponse,
  GetDecksArgs,
  RemoveDeckArgs,
  UpdateDeckArgs,
} from './decksApi.types'

const decksApi = flashcardsApi.injectEndpoints({
  endpoints: builder => {
    return {
      createDeck: builder.mutation<CreateUpdateDeckResponse, CreateDeckArgs>({
        invalidatesTags: ['Deck'],
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
      getDecks: builder.query<DecksListResponse, GetDecksArgs | void>({
        providesTags: ['Deck'],
        query: args => {
          return {
            method: 'GET',
            params: args ?? undefined,
            url: 'v2/decks',
          }
        },
      }),
      removeDeck: builder.mutation<void, RemoveDeckArgs>({
        invalidatesTags: ['Deck'],
        query: ({ id }) => {
          return {
            method: 'DELETE',
            url: `v1/decks/${id}`,
          }
        },
      }),
      updateDeck: builder.mutation<CreateUpdateDeckResponse, UpdateDeckArgs>({
        invalidatesTags: ['Deck'],
        query: ({ id, ...body }) => {
          return {
            body,
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
  useGetDecksQuery,
  useRemoveDeckMutation,
  useUpdateDeckMutation,
} = decksApi
