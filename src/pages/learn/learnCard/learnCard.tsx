import { useState } from 'react'

import { RateYourselfForm } from '@/components/forms'
import { Button, Card, Typography } from '@/components/ui'
import clsx from 'clsx'

import s from './learnCard.module.scss'

import { useLearnPage } from '../hooks/useLearnPage'

export const LearnCard = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { currentCard, deck, getNextQuestion } = useLearnPage()

  const showAnswerHandler = () => setIsOpen(true)

  const nextQuestionClickHandler = async (grade: string) => {
    await getNextQuestion(+grade)
    setIsOpen(false)
  }

  const classNames = {
    answer: clsx(s.answer),
    answerImg: clsx(s.img, s.answerImg),
    attempts: clsx(s.attempts),
    card: clsx(s.card),
    container: clsx(s.container),
    question: clsx(s.question),
    questionImg: clsx(s.img, s.questionImg),
  }

  return (
    <div className={classNames.container}>
      <Card className={classNames.card} title={`Learn "${deck?.name}"`}>
        <Typography className={classNames.question}>
          <Typography variant={'subtitle1'}>Question:&nbsp;</Typography>
          {currentCard?.question}
        </Typography>
        {currentCard?.questionImg && (
          <img alt={'question'} className={classNames.questionImg} src={currentCard.questionImg} />
        )}
        <Typography className={classNames.attempts}>
          Number of attempts to answer the question:&nbsp;
          <Typography variant={'subtitle2'}>{currentCard?.shots}</Typography>
        </Typography>

        {!isOpen && (
          <Button fullWidth onClick={showAnswerHandler}>
            Show Answer
          </Button>
        )}
        {isOpen && (
          <>
            <Typography className={classNames.answer}>
              <Typography variant={'subtitle1'}>Answer:&nbsp;</Typography>
              {currentCard?.answer}
            </Typography>
            {currentCard?.answerImg && (
              <img alt={'answer'} className={classNames.answerImg} src={currentCard.answerImg} />
            )}
            <RateYourselfForm onSubmit={nextQuestionClickHandler} />
          </>
        )}
      </Card>
    </div>
  )
}
