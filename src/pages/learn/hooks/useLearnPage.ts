import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { useGetDeckByIdQuery } from '@/pages/cardsPage/api/cardsApi'
import { Card } from '@/pages/cardsPage/api/cardsApi.types'
import { useGetRandomCardQuery, useSaveTheGradeMutation } from '@/pages/learn/api'

export const useLearnPage = () => {
  const { deckId } = useParams<{ deckId: string }>()

  const {
    data: card,
    error: cardError,
    isLoading: cardIsLoading,
  } = useGetRandomCardQuery({ deckId: deckId ?? '' })
  const {
    data: deck,
    error: deckError,
    isLoading: deckIsLoading,
  } = useGetDeckByIdQuery({ id: deckId ?? '' })

  const [saveTheGrade, newCard] = useSaveTheGradeMutation()

  const [currentCard, setCurrentCard] = useState<Card | undefined>(undefined)

  useEffect(() => {
    if (card) {
      setCurrentCard(card)
    }
  }, [card])

  const getNextQuestion = async (grade: number) => {
    if (card) {
      await saveTheGrade({ cardId: card.id, grade })
    }
    if (newCard.data) {
      setCurrentCard(newCard.data)
    }
  }

  return {
    card,
    cardError,
    cardIsLoading,
    currentCard,
    deck,
    deckError,
    deckIsLoading,
    getNextQuestion,
  }
}
