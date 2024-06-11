import { ComponentPropsWithoutRef, ReactNode } from 'react'
import { Link } from 'react-router-dom'

import { LogOutOutline, Logo, PersonOutline } from '@/assets/icons/components'
import { commonStyles } from '@/common/styles'
import {
  Avatar,
  Button,
  DropdownItem,
  DropdownMenu,
  DropdownSeparator,
  Typography,
} from '@/components/ui'
import clsx from 'clsx'

import s from './header.module.scss'

export type User = {
  avatar?: null | string
  email: string
  name: string
}

type Props = {
  user?: User
} & ComponentPropsWithoutRef<'header'>

export const Header = ({ className, user, ...rest }: Props) => {
  const classNames = {
    header: clsx(s.header, commonStyles.pageContainer, className),
    userContainer: clsx(s.userContainer),
  }

  const dropDownTrigger = (
    <div className={classNames.userContainer}>
      <Typography variant={'subtitle1'}>{user?.name}</Typography>

      <Avatar src={user?.avatar ?? undefined} />
    </div>
  )

  return (
    <header className={classNames.header} {...rest}>
      <Link to={'/'}>
        <Logo height={36} width={156} />
      </Link>
      {user ? (
        <HeaderDropDown trigger={dropDownTrigger} user={user} />
      ) : (
        <Button as={Link} to={'/'} variant={'secondary'}>
          Sign In
        </Button>
      )}
    </header>
  )
}

type HeaderDropDownProps = {
  trigger: ReactNode
  user: User
}

const HeaderDropDown = ({ trigger, user }: HeaderDropDownProps) => {
  return (
    <DropdownMenu trigger={trigger}>
      <DropdownItem>
        <div className={s.userInfo}>
          <Avatar src={user.avatar ?? undefined} />
          <div className={s.infoBlock}>
            <Typography variant={'subtitle2'}>{user.name}</Typography>
            <Typography className={s.email} variant={'caption'}>
              {user.email}
            </Typography>
          </div>
        </div>
      </DropdownItem>
      <DropdownSeparator />
      <DropdownItem className={s.dropDownItem}>
        <PersonOutline width={16} />
        <Typography variant={'caption'}>My Profile</Typography>
      </DropdownItem>
      <DropdownSeparator />
      <DropdownItem className={s.dropDownItem}>
        <LogOutOutline width={16} />
        <Typography variant={'caption'}>Sign Out</Typography>
      </DropdownItem>
    </DropdownMenu>
  )
}
