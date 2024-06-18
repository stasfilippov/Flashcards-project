import { Link } from 'react-router-dom'

import defaultImg from '@/assets/img/defaultImageDeck.png'
import { ROUTES } from '@/common/constants'
import { Button, Typography } from '@/components/ui'
import { GetDeckByIdResponse } from '@/pages/cardsPage/api/cardsApi.types'
import { cardModal } from '@/pages/cardsPage/modals/addNewCard/cardModal'
import clsx from 'clsx'

import s from './header.module.scss'

type Props = {
  deck: GetDeckByIdResponse
  isMy: boolean
}

export const Header = ({ deck, isMy }: Props) => {
  const classNames = {
    image: clsx(s.image),
    title: clsx(s.title),
    wrapperWithControl: clsx(s.wrapperWithControl),
  }

  return (
    <div>
      <div className={classNames.wrapperWithControl}>
        <Typography className={classNames.title} variant={'h1'}>
          {deck.name}
        </Typography>
        {isMy ? (
          <cardModal addCardHandler={() => {}} deckId={deck.id} title={'Add New Card'} />
        ) : (
          <Button as={Link} to={ROUTES.learn}>
            Learn to Deck
          </Button>
        )}
      </div>
      <img alt={'image deck'} className={classNames.image} src={deck.cover || defaultImg} />
    </div>
  )
}
