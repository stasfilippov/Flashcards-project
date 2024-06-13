import { Link } from 'react-router-dom'

import { ROUTES } from '@/common/constants'
import { Button, Typography } from '@/components/ui'
import { GetDeckByIdResponse } from '@/pages/cardsPage/cardsApi.types'
import clsx from 'clsx'

import s from './header.module.scss'

type Props = {
  callback: () => void
  deck: GetDeckByIdResponse
  isMy: boolean
}

export const Header = ({ callback, deck, isMy }: Props) => {
  const classNames = {
    image: clsx(s.image),
    title: clsx(s.title),
    wrapperWithControl: clsx(s.wrapperWithControl),
  }

  return (
    <div>
      <div className={classNames.wrapperWithControl}>
        <Typography className={classNames.title} variant={'h1'}>
          {deck?.name}
        </Typography>
        {isMy ? (
          <Button onClick={callback}>Add New Card</Button>
        ) : (
          <Button as={Link} to={ROUTES.learn}>
            Learn to Deck
          </Button>
        )}
      </div>
      <img alt={'image deck'} className={classNames.image} src={deck?.cover} />
    </div>
  )
}
