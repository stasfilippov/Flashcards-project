import { ComponentPropsWithoutRef, ReactNode, forwardRef } from 'react'

import { Typography } from '@/components/ui'
import * as SelectRadix from '@radix-ui/react-select'
import clsx from 'clsx'

import s from './select.module.scss'

type Props = {
  children: ReactNode
  className?: string
  value: string
} & ComponentPropsWithoutRef<typeof SelectRadix.Item>

export const SelectItem = forwardRef<HTMLDivElement, Props>(
  ({ children, className, value, ...props }, forwardedRef) => {
    return (
      <SelectRadix.Item
        className={clsx(s.selectItem, className)}
        value={value}
        {...props}
        ref={forwardedRef}
      >
        <SelectRadix.ItemText>
          <Typography variant={'body1'}>{children}</Typography>
        </SelectRadix.ItemText>
      </SelectRadix.Item>
    )
  }
)
