import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'

import { ROUTES } from '@/common/constants'
import { commonStyles } from '@/common/styles'
import { Page } from '@/components/layout'
import { Button, Card, Typography } from '@/components/ui'
import { useVerifyEmailMutation } from '@/pages/auth/api'

import s from './confirmEmail.module.scss'

export const ConfirmEmailPage = () => {
  const { verificationToken } = useParams()
  const [verifyEmail] = useVerifyEmailMutation()

  useEffect(() => {
    if (verificationToken) {
      verifyEmail({ code: verificationToken })
    }
  }, [verificationToken])

  return (
    <Page>
      <div className={commonStyles.cardContainer}>
        <Card className={s.card}>
          <Typography variant={'h3'}>Your email has been successfully confirmed.</Typography>
          <Button as={Link} fullWidth to={ROUTES.signIn}>
            Sign in
          </Button>
        </Card>
      </div>
    </Page>
  )
}
