import { Edit2Outline, PlayCircleOutline } from '@/assets/icons/components'
import { ROUTES } from '@/common/constants'
import { DropdownItem, DropdownMenu, DropdownSeparator, Typography } from '@/components/ui'
import { useRemoveDeckMutation } from '@/pages/decksPage/api/decksApi'
import { Deck, RemoveItemArgs } from '@/pages/decksPage/api/decksApi.types'
import { RemoveItemModal } from '@/pages/decksPage/modals'
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

  const [removeDeck] = useRemoveDeckMutation()

  const removeDeckHandler = ({ id }: RemoveItemArgs) => {
    removeDeck({ id })
  }

  const learnHandler = () => {
    router.navigate(`${ROUTES.decks}/${deck.id}${ROUTES.learn}`)
  }

  return (
    <DropdownMenu>
      <DropdownItem className={classNames.item} onSelect={learnHandler}>
        <PlayCircleOutline width={16} />
        <Typography variant={'caption'}>Learn</Typography>
      </DropdownItem>
      <DropdownSeparator />
      <DropdownItem className={classNames.item}>
        <Edit2Outline width={16} />
        <Typography variant={'caption'}>Edit</Typography>
      </DropdownItem>
      <DropdownSeparator />
      <DropdownItem className={classNames.item}>
        <RemoveItemModal id={deck.id} name={deck.name} onRemove={removeDeckHandler} type={'Deck'} />
        <Typography variant={'caption'}>Delete</Typography>
      </DropdownItem>
    </DropdownMenu>
  )
}
