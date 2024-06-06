import { ComponentPropsWithoutRef } from 'react'
import { Link } from 'react-router-dom'

import defaultImage from '@/assets/img/defaultImageDeck.png'
import { Typography } from '@/components/ui'
import { TableCell } from '@/components/ui/table'
import clsx from 'clsx'

import s from '@/components/ui/table/table.module.scss'

type Props = {
  id: string
  item: Deck
} & ComponentPropsWithoutRef<'td'>
export const TableCellWithPhotoDecks = ({ children, id, item, ...rest }: Props) => {
  const classNames = {
    tCell: clsx(s.tCell),
    tCellImageOfDeck: clsx(s.tableCellImage),
  }

  return (
    <TableCell className={classNames.tCell} id={id} {...rest}>
      <Link to={'/'}>
        <img
          alt={'deckImage'}
          className={classNames.tCellImageOfDeck}
          src={item?.cover ? item?.cover : defaultImage}
        />
        <Typography variant={'body2'}>{children}</Typography>
      </Link>
    </TableCell>
  )
}

export type Author = {
  id: string
  name: string
}

export type Deck = {
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