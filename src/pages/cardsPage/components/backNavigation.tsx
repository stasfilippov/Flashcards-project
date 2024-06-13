import { Link } from 'react-router-dom'

import { ArrowBackOutline } from '@/assets/icons/components'
import { ROUTES } from '@/common/constants'
import { Typography } from '@/components/ui'

export const BackNavigation = () => {
  return (
    <div>
      <ArrowBackOutline width={16} />
      <Typography component={Link} to={ROUTES.base} variant={'body2'}>
        Back to Decks List
      </Typography>
    </div>
  )
}
