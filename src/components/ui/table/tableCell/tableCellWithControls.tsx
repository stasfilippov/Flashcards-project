import { ComponentPropsWithoutRef } from 'react'

import { PlayCircleOutline } from '@/assets/icons/components'
import { ROUTES } from '@/common/constants'
import { TableCell } from '@/components/ui/table'
import { useDeleteCardMutation, useEditCardMutation } from '@/pages/cardsPage/api/cardsApi'
import { Card, EditCardArgs } from '@/pages/cardsPage/api/cardsApi.types'
import { CardModal, DefaultValueOfModal } from '@/pages/cardsPage/modals/cardModal/cardModal'
import { useRemoveDeckMutation, useUpdateDeckMutation } from '@/pages/decksPage/api/decksApi'
import { CreateDeckArgs, Deck, RemoveItemArgs } from '@/pages/decksPage/api/decksApi.types'
import { DeckModal } from '@/pages/decksPage/modals/deckModal/deckModal'
import { RemoveItemModal } from '@/pages/decksPage/modals/removeItem/removeItemModal'
import { router } from '@/router'
import clsx from 'clsx'

import s from '@/components/ui/table/table.module.scss'

type Props = {
  id: string
  item: { card: Card; deck?: never } | { card?: never; deck: Deck }
  userId: string
  variant: 'Card' | 'Deck'
} & ComponentPropsWithoutRef<'td'>
export const TableCellWithControls = ({ children, id, item, userId, variant, ...rest }: Props) => {
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
          <DeckVariant currentUser={userId} item={deck} />
        </div>
      ) : (
        <div className={classNames.tCellControlsWrapper}>
          <CardVariant currentUser={userId} item={card} />
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
  const [updateDeck] = useUpdateDeckMutation()
  const [removeDeck] = useRemoveDeckMutation()

  const updateDeckHandler = (data: Partial<CreateDeckArgs>) => {
    updateDeck({ ...data, id: item?.id ?? '' })
  }

  const removeDeckHandler = ({ id }: RemoveItemArgs) => {
    removeDeck({ id })
  }

  const learnHandler = async () => {
    await router.navigate(`${ROUTES.decks}/${item?.id}${ROUTES.learn}`)
  }

  return (
    <>
      {item && currentUser === item.author.id ? (
        <>
          <DeckModal
            confirmHandler={updateDeckHandler}
            defaultValues={{ cover: item.cover, isPrivate: item.isPrivate, name: item.name }}
            id={item.id}
          />
          <button disabled={!item.cardsCount}>
            <PlayCircleOutline width={16} />
          </button>
          <RemoveItemModal
            id={item.id}
            name={item.name}
            onRemove={removeDeckHandler}
            type={'Deck'}
          />
        </>
      ) : (
        <>
          <button disabled={!item?.cardsCount} onClick={learnHandler}>
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
  const [updateCard] = useEditCardMutation()
  const [deleteCard] = useDeleteCardMutation()

  const updateDeckHandler = (data: Omit<EditCardArgs, 'id'>) => {
    updateCard({ ...data, id: item?.id ?? '' })
  }

  const removeCardHandler = ({ id }: RemoveItemArgs) => {
    deleteCard({ id })
  }

  return item && currentUser === item.userId ? (
    <>
      <CardModal
        confirmHandler={updateDeckHandler}
        defaultValues={
          {
            answer: item.answer,
            previewImgAnswer: item.answerImg,
            previewImgQuestion: item.questionImg,
            question: item.question,
          } as DefaultValueOfModal
        }
        title={'Edit card'}
      />
      <RemoveItemModal
        id={item.id}
        name={item.question}
        onRemove={removeCardHandler}
        type={'Card'}
      />
    </>
  ) : (
    <></>
  )
}
