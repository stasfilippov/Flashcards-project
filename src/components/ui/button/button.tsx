import { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react'

import { Typography } from '@/components/ui'
import clsx from 'clsx'

import s from './button.module.scss'

export type ButtonProps<T extends ElementType = 'button'> = {
  as?: T
  children?: ReactNode
  className?: string
  fullWidth?: boolean
  icon?: ReactNode
  variant?: 'primary' | 'secondary'
} & ComponentPropsWithoutRef<T>

export const Button = <T extends ElementType = 'button'>(props: ButtonProps<T>) => {
  const {
    as: Component = 'button',
    children,
    className,
    fullWidth,
    icon,
    variant = 'primary',
    ...rest
  } = props

  const classNames = {
    button: clsx(s.button, s[variant], { [s.fullWidth]: fullWidth }, className),
  }

  return (
    <Component className={classNames.button} {...rest}>
      {icon}
      <Typography variant={'subtitle2'}>{children}</Typography>
    </Component>
  )
}
