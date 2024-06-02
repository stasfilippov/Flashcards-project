import { ComponentPropsWithoutRef } from 'react'
import { Link } from 'react-router-dom'

import { Edit2Outline, PlayCircleOutline, TrashOutline } from '@/assets/icons/components'
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

type tableCellProps = {
  deck: Deck
  id: string
} & ComponentPropsWithoutRef<'td'>

export const TableCell = ({ children, className, deck, id, ...props }: tableCellProps) => {
  //later here we need to get the current user with useSelector
  const currentUser = 'Пупсик'

  const classNames = {
    tCell: clsx(s.tCell, className),
    tCellImageOfDeck: clsx(s.tCellImageOfDeck, className),
  }

  switch (id) {
    case 'name':
      return (
        <td className={classNames.tCell} id={id} {...props}>
          <Link to={'/'}>
            <img
              alt={'deckImage'}
              className={classNames.tCellImageOfDeck}
              src={deck.cover ? deck.cover : defaultImage}
            />
            <Typography variant={'body2'}>{children}</Typography>
          </Link>
        </td>
      )

    case 'controls':
      return (
        <td className={classNames.tCell} id={id} {...props}>
          {currentUser === deck.author.name ? (
            <div className={clsx(s.tCellControlsWrapper)}>
              <button>
                <Edit2Outline width={16} />
              </button>
              <button disabled={!deck.cardsCount}>
                <PlayCircleOutline width={16} />
              </button>
              <button>
                <TrashOutline width={16} />
              </button>
            </div>
          ) : (
            <div className={clsx(s.tCellControlsWrapper)}>
              <button disabled={!deck.cardsCount}>
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

  // return <td className={clsx(classNames.tCell, className)} {...props} />
}
