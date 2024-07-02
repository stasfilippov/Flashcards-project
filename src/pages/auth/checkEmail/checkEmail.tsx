import { Link } from 'react-router-dom'

import { CheckEmailIcon } from '@/assets/icons/components'
import { ROUTES } from '@/common/constants'
import { commonStyles } from '@/common/styles'
import { Button, Card, Typography } from '@/components/ui'
import clsx from 'clsx'

import s from './checkEmail.module.scss'

export const CheckEmail = () => {
  const classNames = {
    card: clsx(s.card),
    container: clsx(commonStyles.cardContainer),
    description: clsx(s.description),
    iconWrapper: clsx(s.icon),
  }

  return (
    <div className={classNames.container}>
      <Card className={classNames.card} title={'Check Email'}>
        <div className={classNames.iconWrapper}>
          <CheckEmailIcon width={94} />
        </div>
        <Typography className={classNames.description} component={'div'} variant={'body2'}>
          We’ve sent an Email with instructions to example@mail.com
        </Typography>
        <Button as={Link} fullWidth to={ROUTES.signIn}>
          Back to Sign In
        </Button>
      </Card>
    </div>
  )
}
