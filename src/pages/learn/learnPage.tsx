import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { Page } from '@/components/layout'
import { Button } from '@/components/ui'
import { Card } from '@/pages/cardsPage/api/cardsApi.types'

import { useGetRandomCardQuery, useSaveTheGradeMutation } from './api'

export const LearnPage = () => {
  const { deckId } = useParams<{ deckId: string }>()

  const { data: card, error, isLoading } = useGetRandomCardQuery({ deckId: deckId ?? '' })
  const [saveTheGrade, newCard] = useSaveTheGradeMutation()

  const [currentCard, setCurrentCard] = useState<Card | undefined>(undefined)

  useEffect(() => {
    if (card) {
      setCurrentCard(card)
    }
  }, [card])

  const nextQuestionClickHandler = async () => {
    if (currentCard) {
      await saveTheGrade({ cardId: currentCard.id, grade: 2 })
    }
    if (newCard.data) {
      setCurrentCard(newCard.data)
    }
  }

  return (
    <Page>
      {error ? (
        <h1>Error: {JSON.stringify(error)}</h1>
      ) : isLoading ? (
        <h1>Loading...</h1>
      ) : currentCard ? (
        <></>
      ) : null}
    </Page>
  )
}
