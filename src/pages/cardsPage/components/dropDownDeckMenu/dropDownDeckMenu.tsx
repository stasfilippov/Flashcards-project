import { useState } from 'react'

import { Edit2Outline, PlayCircleOutline, TrashOutline } from '@/assets/icons/components'
import { ROUTES } from '@/common/constants'
import { DropdownItem, DropdownMenu, DropdownSeparator, Typography } from '@/components/ui'
import { useRemoveDeckMutation, useUpdateDeckMutation } from '@/pages/decksPage/api/decksApi'
import { CreateDeckArgs, Deck, RemoveItemArgs } from '@/pages/decksPage/api/decksApi.types'
import { DeckModal, RemoveItemModal } from '@/pages/decksPage/modals'
import { router } from '@/router'
import clsx from 'clsx'

import s from './dropDownDeckMenu.module.scss'

type Props = {
  deck: Omit<Deck, 'author'>
}

export const DropDownDeckMenu = ({ deck }: Props) => {
  const classNames = {
    item: clsx(s.item),
  }

  const [isOpenEditDeckModal, setIsOpenEditDeckModal] = useState(false)

  const [removeDeck] = useRemoveDeckMutation()
  const [updateDeck] = useUpdateDeckMutation()

  const editDeckHandler = (data: Partial<CreateDeckArgs>) => {
    debugger
    updateDeck({ id: deck.id, ...data })
  }

  const removeDeckHandler = ({ id }: RemoveItemArgs) => {
    removeDeck({ id }).then(() => router.navigate(ROUTES.decks))
  }

  const learnHandler = () => {
    router.navigate(`${ROUTES.decks}/${deck.id}${ROUTES.learn}`)
  }

  return (
    <>
      <DropdownMenu>
        <DropdownItem
          className={classNames.item}
          disabled={!deck.cardsCount}
          onSelect={learnHandler}
        >
          <PlayCircleOutline width={16} />
          <Typography variant={'caption'}>Learn</Typography>
        </DropdownItem>
        <DropdownSeparator />
        <DropdownItem
          className={classNames.item}
          onClick={() => {
            setIsOpenEditDeckModal(true)
          }}
        >
          <Edit2Outline width={16} />
          <Typography variant={'caption'}>Edit</Typography>
        </DropdownItem>
        <DropdownSeparator />
        <DropdownItem className={classNames.item}>
          <RemoveItemModal id={deck.id} name={deck.name} onRemove={removeDeckHandler} type={'Deck'}>
            {openModal => (
              <div
                className={classNames.item}
                onClick={e => {
                  e.stopPropagation()
                  openModal()
                }}
              >
                <TrashOutline width={16} />
                <Typography variant={'caption'}>Delete</Typography>
              </div>
            )}
          </RemoveItemModal>
        </DropdownItem>
      </DropdownMenu>{' '}
      <DeckModal
        closeModal={() => setIsOpenEditDeckModal(false)}
        confirmHandler={editDeckHandler}
        defaultValues={{ cover: deck.cover, isPrivate: deck.isPrivate, name: deck.name }}
        id={deck.id}
        isOpen={isOpenEditDeckModal}
      />
    </>
  )
}
