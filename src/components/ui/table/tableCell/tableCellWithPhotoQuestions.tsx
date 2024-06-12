import { ComponentPropsWithoutRef } from 'react'

import defaultImage from '@/assets/img/defaultImageDeck.png'
import { Typography } from '@/components/ui'
import { TableCell } from '@/components/ui/table'
import { Card } from '@/pages/cardsPage/cardsApi.types'
import clsx from 'clsx'

import s from '@/components/ui/table/table.module.scss'

type Props = {
  id: string
  item: Card
} & ComponentPropsWithoutRef<'td'>
export const TableCellWithPhotoQuestions = ({ children, id, item, ...rest }: Props) => {
  const classNames = {
    tCell: clsx(s.tCell),
    tCellImageOfDeck: clsx(s.tableCellImage),
  }

  return (
    <TableCell className={classNames.tCell} id={id} {...rest}>
      {id === 'question' ? (
        <img
          alt={'image'}
          className={classNames.tCellImageOfDeck}
          src={item.questionImg ? item.questionImg : defaultImage}
        />
      ) : (
        <img
          alt={'image'}
          className={classNames.tCellImageOfDeck}
          src={item.answerImg ? item.answerImg : defaultImage}
        />
      )}

      <Typography variant={'body2'}>{children}</Typography>
    </TableCell>
  )
}
