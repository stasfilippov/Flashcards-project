import { ComponentPropsWithoutRef } from 'react'

import { Person } from '@/assets/icons/components'
import clsx from 'clsx'

import s from './avatar.module.scss'

type Props = {
  size?: 'large' | 'small'
} & Omit<ComponentPropsWithoutRef<'img'>, 'alt'>

export const Avatar = ({ className, size = 'small', src, ...rest }: Props) => {
  const classNames = {
    avatar: clsx(s.avatar, s[size], className, { [s.icon]: !src }),
  }

  return (
    <>
      {src ? (
        <img alt={'avatar'} className={classNames.avatar} src={src} {...rest} />
      ) : (
        <div className={classNames.avatar}>
          <Person />
        </div>
      )}
    </>
  )
}
