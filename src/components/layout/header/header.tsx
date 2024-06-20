import { ComponentPropsWithoutRef, ReactNode } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { LogOutOutline, PersonOutline } from '@/assets/icons/components'
import logo from '@/assets/img/logo.png'
import { ROUTES } from '@/common/constants'
import {
  Avatar,
  Button,
  DropdownItem,
  DropdownMenu,
  DropdownSeparator,
  Typography,
} from '@/components/ui'
import { ProgressBar } from '@/components/ui/progressBar/progressBar'
import { appStatusSelector } from '@/services/appSlice/appSlice.selectors'
import clsx from 'clsx'

import s from './header.module.scss'

export type User = {
  avatar?: null | string
  email: string
  name: string
}

export type HeaderProps = {
  onLogout: () => void
  user?: User
} & ComponentPropsWithoutRef<'header'>

export const Header = ({ className, onLogout, user, ...rest }: HeaderProps) => {
  const isLoading = useSelector(appStatusSelector)

  const classNames = {
    header: clsx(s.header, className),
    headerWrapper: clsx(s.headerWrapper),
    imgWrapper: clsx(s.imgWrapper),
    progressBar: clsx(s.progressBar),
    userContainer: clsx(s.userContainer),
  }

  const dropDownTrigger = (
    <div className={classNames.userContainer}>
      <Typography variant={'subtitle1'}>{user?.name}</Typography>

      <Avatar src={user?.avatar ?? undefined} />
    </div>
  )

  return (
    <div className={classNames.headerWrapper}>
      <header className={classNames.header} {...rest}>
        <Link to={ROUTES.base}>
          <div className={classNames.imgWrapper}>
            <img alt={'logo'} src={logo} />
          </div>
        </Link>
        {user ? (
          <HeaderDropDown onLogout={onLogout} trigger={dropDownTrigger} user={user} />
        ) : (
          <Button as={Link} to={ROUTES.signIn} variant={'secondary'}>
            Sign In
          </Button>
        )}
      </header>
      {isLoading === 'loading' && <ProgressBar className={classNames.progressBar} />}
    </div>
  )
}

type HeaderDropDownProps = {
  onLogout: () => void
  trigger: ReactNode
  user: User
}

const HeaderDropDown = ({ onLogout, trigger, user }: HeaderDropDownProps) => {
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
        <Typography component={Link} to={ROUTES.profile} variant={'caption'}>
          My Profile
        </Typography>
      </DropdownItem>
      <DropdownSeparator />
      <DropdownItem className={s.dropDownItem}>
        <LogOutOutline width={16} />
        <Typography onClick={() => onLogout} variant={'caption'}>
          Sign Out
        </Typography>
      </DropdownItem>
    </DropdownMenu>
  )
}
