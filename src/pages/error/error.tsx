import { Link } from 'react-router-dom'

import { ROUTES } from '@/common/constants'
import { Page } from '@/components/layout'
import { Button, Typography } from '@/components/ui'

import s from './error.module.scss'

import errorImg from './404.svg'

export const Error = () => {
  return (
    <Page className={s.container}>
      <img alt={'Error'} src={errorImg} />
      <Typography component={'p'} variant={'body1'}>
        Sorry! Page not found!
      </Typography>
      <Button as={Link} to={ROUTES.base}>
        Back to home page
      </Button>
    </Page>
  )
}
