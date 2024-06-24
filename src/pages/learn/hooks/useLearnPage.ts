import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { Card } from '@/pages/cardsPage/api/cardsApi.types'
import { useGetDeckByIdQuery } from '@/pages/decksPage/api/decksApi'
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

  const [saveTheGrade] = useSaveTheGradeMutation()

  const [currentCard, setCurrentCard] = useState<Card | undefined>(undefined)

  useEffect(() => {
    if (card) {
      setCurrentCard(card)
    }
  }, [card])

  const getNextQuestion = async (grade: number) => {
    if (currentCard) {
      const newCard = await saveTheGrade({ cardId: currentCard.id, grade }).unwrap()

      setCurrentCard(newCard)
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
