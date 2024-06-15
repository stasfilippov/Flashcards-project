import { ComponentPropsWithoutRef } from 'react'

import { Edit2Outline, PlayCircleOutline } from '@/assets/icons/components'
import { TableCell } from '@/components/ui/table'
import { Card } from '@/pages/cardsPage/api/cardsApi.types'
import { Deck } from '@/pages/decksPage/api/decksApi.types'
import { RemoveItemModal } from '@/pages/decksPage/modals/removeItem/removeItemModal'
import clsx from 'clsx'

import s from '@/components/ui/table/table.module.scss'

type Props = {
  currentUser: string
  id: string
  item: { card: Card; deck?: never } | { card?: never; deck: Deck }
  variant: 'Card' | 'Deck'
} & ComponentPropsWithoutRef<'td'>
export const TableCellWithControls = ({
  children,
  currentUser,
  id,
  item,
  variant,
  ...rest
}: Props) => {
  const { card, deck } = item

  const classNames = {
    tCell: clsx(s.tCell),
    tCellControlsWrapper: clsx(s.tCellControlsWrapper),
    tCellImageOfDeck: clsx(s.tableCellImage),
  }

  return (
    <TableCell className={classNames.tCell} {...rest}>
      {variant === 'Deck' ? (
        <div className={classNames.tCellControlsWrapper}>
          <DeckVariant currentUser={currentUser} item={deck} />
        </div>
      ) : (
        <div className={classNames.tCellControlsWrapper}>
          <CardVariant currentUser={currentUser} item={card} />
        </div>
      )}
    </TableCell>
  )
}

type DeckVariantProps = {
  currentUser: string
  item: Deck | undefined
}
const DeckVariant = ({ currentUser, item }: DeckVariantProps) => {
  return (
    <>
      {item && currentUser === item.author.id ? (
        <>
          <button>
            <Edit2Outline width={16} />
          </button>
          <button disabled={!item.cardsCount}>
            <PlayCircleOutline width={16} />
          </button>
          <RemoveItemModal id={item.id} name={item.name} type={'Deck'} />
        </>
      ) : (
        <>
          <button disabled={!item?.cardsCount}>
            <PlayCircleOutline width={16} />
          </button>
        </>
      )}
    </>
  )
}

type CardVariantProps = {
  currentUser: string
  item: Card | undefined
}
const CardVariant = ({ currentUser, item }: CardVariantProps) => {
  return item && currentUser === item.userId ? (
    <>
      <button>
        <Edit2Outline width={16} />
      </button>
      <RemoveItemModal id={item.id} name={item.question} type={'Card'} />
    </>
  ) : (
    <></>
  )
}
