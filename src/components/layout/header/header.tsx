import { ComponentPropsWithoutRef } from 'react'
import { Link } from 'react-router-dom'

import Logo from '@/assets/icons/components/logo'
import { commonStyles } from '@/common/styles'
import { Typography } from '@/components/ui'
import { Avatar } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import clsx from 'clsx'

import s from './header.module.scss'

type Props = {
  user?: {
    avatar?: null | string
    email: string
    name: string
  }
} & ComponentPropsWithoutRef<'header'>

export const Header = ({ className, user, ...rest }: Props) => {
  const classNames = {
    header: clsx(s.header, commonStyles.container, className),
    userContainer: clsx(s.userContainer),
  }

  return (
    <header className={classNames.header} {...rest}>
      <Link to={'/'}>
        <Logo height={36} width={156} />
      </Link>
      {user ? (
        <div className={classNames.userContainer}>
          <Typography variant={'subtitle1'}>{user.name}</Typography>

          <Avatar src={user.avatar ?? undefined} />
        </div>
      ) : (
        <Button as={Link} to={'/'} variant={'secondary'}>
          Sign In
        </Button>
      )}
    </header>
  )
}
