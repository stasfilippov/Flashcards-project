import { Card } from '@/pages/cardsPage/api/cardsApi.types'
import { flashcardsApi } from '@/services/flashcardApi'

import { GetRandomCardArgs, SaveTheGradeArgs } from './'

const learnApi = flashcardsApi.injectEndpoints({
  endpoints: builder => ({
    getRandomCard: builder.query<Card, GetRandomCardArgs>({
      query: ({ deckId }) => ({ method: 'GET', url: `/v1/decks/${deckId}/learn` }),
    }),
    saveTheGrade: builder.mutation<Card, SaveTheGradeArgs>({
      query: args => ({
        body: args,
        method: 'POST',
        url: `/v1/decks/${args.cardId}/learn`,
      }),
    }),
  }),
})

export const { useGetRandomCardQuery, useSaveTheGradeMutation } = learnApi
