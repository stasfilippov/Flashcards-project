import { Link } from 'react-router-dom'

import defaultImg from '@/assets/img/defaultImageDeck.png'
import { ROUTES } from '@/common/constants'
import { CardModal } from '@/components/modals'
import { Button, Typography } from '@/components/ui'
import {
  CreateCardArgs,
  GetDeckByIdResponse,
  useCreateNewCardMutation,
} from '@/pages/cardsPage/api'
import clsx from 'clsx'

import s from './header.module.scss'

import { DropDownDeckMenu } from '../'

type Props = {
  deck: GetDeckByIdResponse
  isMy: boolean
}

export const HeaderOfCardsPage = ({ deck, isMy }: Props) => {
  const classNames = {
    image: clsx(s.image),
    title: clsx(s.title),
    titleWithDropDownContainer: clsx(s.titleWithDropDownContainer),
    wrapperWithControl: clsx(s.wrapperWithControl),
  }

  const [createCard] = useCreateNewCardMutation()

  const createCardHandler = (data: Omit<CreateCardArgs, 'id'>) => {
    const newCard: CreateCardArgs = { ...data, id: deck.id }

    createCard(newCard)
  }

  return (
    <div>
      <div className={classNames.wrapperWithControl}>
        <div className={classNames.titleWithDropDownContainer}>
          <Typography className={classNames.title} variant={'h1'}>
            {deck.name}
          </Typography>
          {isMy && <DropDownDeckMenu deck={deck} />}
        </div>
        {isMy ? (
          <CardModal confirmHandler={createCardHandler} title={'Add New Card'} />
        ) : (
          <Button as={Link} to={`${ROUTES.decks}/${deck.id}${ROUTES.learn}`}>
            Learn to Deck
          </Button>
        )}
      </div>
      <img alt={'image deck'} className={classNames.image} src={deck.cover || defaultImg} />
    </div>
  )
}
