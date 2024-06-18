import { useState } from 'react'

import { RateYourselfForm } from '@/components/forms/rateYourself/rateYourselfForm'
import { Button, Card } from '@/components/ui'
import { useLearnPage } from '@/pages/learn/hooks/useLearnPage'

export const LearnCard = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { currentCard, deck, getNextQuestion } = useLearnPage()

  const showAnswerHandler = () => setIsOpen(true)

  const nextQuestionClickHandler = async (grade: string) => {
    await getNextQuestion(+grade)
    setIsOpen(false)
  }

  return (
    <Card title={`Learn "${deck?.name}"`}>
      Question: {currentCard?.question}
      {currentCard?.questionImg && <img alt={'question'} src={currentCard.questionImg} />}
      Number of attempts to answer the question: {currentCard?.shots}
      {!isOpen && (
        <Button fullWidth onClick={showAnswerHandler}>
          Show Answer
        </Button>
      )}
      {isOpen && (
        <>
          Answer: {currentCard?.answer}
          {currentCard?.answerImg && <img alt={'answer'} src={currentCard.answerImg} />}
          <RateYourselfForm onSubmit={nextQuestionClickHandler} />
        </>
      )}
    </Card>
  )
}
