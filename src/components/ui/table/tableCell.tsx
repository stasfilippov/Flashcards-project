import { ComponentPropsWithoutRef } from 'react'
import { Link } from 'react-router-dom'

import {
  Edit2Outline,
  PlayCircleOutline,
  StarOutline,
  TrashOutline,
} from '@/assets/icons/components'
import defaultImage from '@/assets/img/defaultImageDeck.png'
import { Typography } from '@/components/ui'
import clsx from 'clsx'

import s from './table.module.scss'

type Author = {
  id: string
  name: string
}

type Deck = {
  author: Author
  cardsCount: number
  cover?: null | string
  created: string
  id: string
  isFavorite: boolean
  isPrivate: boolean
  name: string
  updated: string
  userId: string
}

type QuestionAnswer = {
  answer: string
  answerImg?: null | string
  answerVideo?: null | string
  created: string
  deckId: string
  grade: number
  id: string
  question: string
  questionImg: null | string
  questionVideo?: null | string
  shots: number
  updated: string
  userId: string
}

type tableCellProps = {
  id: string
  itemDeck?: Deck
  itemQuestion?: QuestionAnswer
} & ComponentPropsWithoutRef<'td'>

export const TableCell = ({
  children,
  className,
  id,
  itemDeck,
  itemQuestion,
  ...props
}: tableCellProps) => {
  //later here we need to get the current user with useSelector
  const currentUser = 'Пупсик'

  const classNames = {
    tCell: clsx(s.tCell, className),
    tCellImageOfDeck: clsx(s.tCellImageOfDeck, className),
  }

  if (itemDeck) {
    const { author, cardsCount, cover } = itemDeck

    switch (id) {
      case 'name':
        return (
          <td className={classNames.tCell} id={id} {...props}>
            <Link to={'/'}>
              <img
                alt={'deckImage'}
                className={classNames.tCellImageOfDeck}
                src={cover ? cover : defaultImage}
              />
              <Typography variant={'body2'}>{children}</Typography>
            </Link>
          </td>
        )

      case 'controls':
        return (
          <td className={classNames.tCell} id={id} {...props}>
            {currentUser === author.name ? (
              <div className={clsx(s.tCellControlsWrapper)}>
                <button>
                  <Edit2Outline width={16} />
                </button>
                <button disabled={!cardsCount}>
                  <PlayCircleOutline width={16} />
                </button>
                <button>
                  <TrashOutline width={16} />
                </button>
              </div>
            ) : (
              <div className={clsx(s.tCellControlsWrapper)}>
                <button disabled={!cardsCount}>
                  <PlayCircleOutline width={16} />
                </button>
              </div>
            )}
          </td>
        )

      default:
        return (
          <td className={classNames.tCell} id={id} {...props}>
            <Typography variant={'body2'}>{children}</Typography>
          </td>
        )
    }
  }

  if (itemQuestion) {
    const { answerImg, grade, questionImg } = itemQuestion
    const gradeCount = 5
    const stars = Array(gradeCount).fill(0)

    switch (id) {
      case 'question':
        return (
          <td className={classNames.tCell} id={id} {...props}>
            <img
              alt={'questionImg'}
              className={classNames.tCellImageOfDeck}
              src={questionImg ? questionImg : defaultImage}
            />
            <Typography variant={'body2'}>{children}</Typography>
          </td>
        )

      case 'answer':
        return (
          <td className={classNames.tCell} id={id} {...props}>
            <img
              alt={'answerImg'}
              className={classNames.tCellImageOfDeck}
              src={answerImg ? answerImg : defaultImage}
            />
            <Typography variant={'body2'}>{children}</Typography>
          </td>
        )

      case 'grade':
        return (
          <td className={classNames.tCell} id={id} {...props}>
            {stars.map((item, index) => {
              return <StarOutline key={index} width={16} />
            })}
          </td>
        )

      default:
        return (
          <td className={classNames.tCell} id={id} {...props}>
            <Typography variant={'body2'}>{children}</Typography>
          </td>
        )
    }
  }
  // return <td className={clsx(classNames.tCell, className)} {...props} />
}
