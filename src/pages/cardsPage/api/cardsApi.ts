import {
  Card,
  CreateCardArgs,
  EditCardArgs,
  EditCardResponse,
  GetCardByIdArgs,
  GetCardsArgs,
  GetCardsResponse,
} from '@/pages/cardsPage/api/cardsApi.types'
import { RemoveItemArgs } from '@/pages/decksPage/api/decksApi.types'
import { flashcardsApi } from '@/services/flashcardApi'

const cardsApi = flashcardsApi.injectEndpoints({
  endpoints: builder => ({
    createNewCard: builder.mutation<Card, CreateCardArgs>({
      invalidatesTags: ['Cards', 'MinMaxCards'],
      query: ({ answer, answerImg, id, question, questionImg }) => {
        const formData = new FormData()

        if (answer) {
          formData.append('answer', answer)
        }

        if (question) {
          formData.append('question', question)
        }

        if (answerImg) {
          formData.append('answerImg', answerImg)
        } else if (answerImg === null) {
          formData.append('answerImg', '')
        }

        if (questionImg) {
          formData.append('questionImg', questionImg)
        } else if (questionImg === null) {
          formData.append('questionImg', '')
        }

        return {
          body: formData,
          method: 'POST',
          url: `/v1/decks/${id}/cards`,
        }
      },
    }),
    deleteCard: builder.mutation<void, RemoveItemArgs>({
      invalidatesTags: ['Cards', 'MinMaxCards'],
      query: ({ id }) => ({
        method: 'DELETE',
        url: `/v1/cards/${id}`,
      }),
    }),
    editCard: builder.mutation<EditCardResponse, EditCardArgs>({
      invalidatesTags: ['Cards'],
      query: ({ answer, answerImg, id, question, questionImg }) => {
        const formData = new FormData()

        if (answer) {
          formData.append('answer', answer)
        }

        if (question) {
          formData.append('question', question)
        }

        if (answerImg) {
          formData.append('answerImg', answerImg)
        } else if (answerImg === null) {
          formData.append('answerImg', '')
        }

        if (questionImg) {
          formData.append('questionImg', questionImg)
        } else if (questionImg === null) {
          formData.append('questionImg', '')
        }

        return {
          body: formData,
          method: 'PATCH',
          url: `/v1/cards/${id}`,
        }
      },
    }),
    getCardById: builder.query<Card, GetCardByIdArgs>({
      providesTags: ['Cards'],
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
  }),
})

export const {
  useCreateNewCardMutation,
  useDeleteCardMutation,
  useEditCardMutation,
  useGetCardsQuery,
} = cardsApi
