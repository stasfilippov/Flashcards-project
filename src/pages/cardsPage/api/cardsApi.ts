import {
  Card,
  EditCardArgs,
  EditCardResponse,
  GetCardByIdArgs,
  GetCardsArgs,
  GetCardsResponse,
  GetDeckByIdArgs,
  GetDeckByIdResponse,
} from '@/pages/cardsPage/api/cardsApi.types'
import { flashcardsApi } from '@/services/flashcardApi'

const cardsApi = flashcardsApi.injectEndpoints({
  endpoints: builder => ({
    createNewCard: builder.mutation<any, any>({
      invalidatesTags: ['Cards'],
      query: ({ id, ...args }) => ({
        body: args,
        method: 'POST',
        url: `/v1/decks/${id}/cards`,
      }),
    }),
    deleteCard: builder.mutation<any, any>({
      invalidatesTags: ['Cards'],
      query: ({ id }) => ({
        method: 'DELETE',
        url: `/v1/cards/${id}`,
      }),
    }),
    editCard: builder.mutation<EditCardResponse, EditCardArgs>({
      invalidatesTags: ['Cards'],
      query: ({ id, ...args }) => ({
        body: args,
        method: 'PATCH',
        url: `/v1/cards/${id}`,
      }),
    }),
    getCardById: builder.query<Card, GetCardByIdArgs>({
      query: ({ id }) => ({
        method: 'GET',
        url: `/v1/cards/${id}`,
      }),
    }),
    getCards: builder.query<GetCardsResponse, GetCardsArgs>({
      providesTags: ['Cards'],
      query: ({ id, ...args }) => ({
        method: 'GET',
        params: args ?? undefined,
        url: `/v1/decks/${id}/cards`,
      }),
    }),
    getDeckById: builder.query<GetDeckByIdResponse, GetDeckByIdArgs>({
      providesTags: ['Cards'],
      query: ({ id }) => ({
        method: 'GET',
        url: `/v1/decks/${id}`,
      }),
    }),
  }),
})

export const { useEditCardMutation, useGetCardsQuery, useGetDeckByIdQuery } = cardsApi
