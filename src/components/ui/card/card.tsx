import { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react'

import { Typography } from '@/components/ui/typography'
import clsx from 'clsx'

import s from './card.module.scss'

export type CardProps<T extends ElementType = 'div'> = {
  children?: ReactNode
  className?: string
  component?: T
  title?: string
} & ComponentPropsWithoutRef<T>

export const Card = <T extends ElementType = 'div'>(props: CardProps<T>) => {
  const { children, className, component: Component = 'div', title, ...rest } = props

  return (
    <Component className={clsx(className, s.card)} {...rest}>
      {title && (
        <Typography component={'h1'} variant={'h1'}>
          {title}
        </Typography>
      )}
      {children}
    </Component>
  )
}
