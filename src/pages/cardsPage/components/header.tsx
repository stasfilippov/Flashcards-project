import { Link } from 'react-router-dom'

import { ROUTES } from '@/common/constants'
import { Button, Typography } from '@/components/ui'
import { GetDeckByIdResponse } from '@/pages/cardsPage/cardsApi.types'

type Props = {
  callback: () => void
  deck: GetDeckByIdResponse
}
const currentUser = '5b2174ce-9499-4693-9a73-026e01cd9ed4'

export const Header = ({ callback, deck }: Props) => {
  return (
    <div>
      <div>
        <Typography variant={'h1'}>{deck?.name}</Typography>
        <img alt={'image'} src={deck?.cover} style={{ width: '170px' }} />
      </div>
      {deck?.userId === currentUser ? (
        <Button onClick={callback}>Add New Card</Button>
      ) : (
        <Button as={Link} to={ROUTES.learn}>
          Learn to Deck
        </Button>
      )}
    </div>
  )
}
