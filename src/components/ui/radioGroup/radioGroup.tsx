import { ElementRef, forwardRef } from 'react'

import { Typography } from '@/components/ui'
import * as RadioGroupRadix from '@radix-ui/react-radio-group'
import clsx from 'clsx'

import s from './radioGroup.module.scss'

export type RadioGroupOptions = {
  label: string
  value: string
}

export type RadioProps = {
  error?: string
  options: RadioGroupOptions[]
} & RadioGroupRadix.RadioGroupProps

export const RadioGroup = forwardRef<ElementRef<typeof RadioGroupRadix.Root>, RadioProps>(
  ({ children, className, defaultValue, error, options, ...rest }, ref) => {
    const classNames = {
      error: clsx(s.errorMessage),
      indicator: clsx(s.radioGroupIndicator),
      item: clsx(s.radioGroupItem, s.button),
      itemContainer: clsx(s.radioGroupItemContainer),
      label: clsx(s.label),
      root: clsx(s.radioGroupRoot, className),
    }

    return (
      <RadioGroupRadix.Root
        className={classNames.root}
        defaultValue={defaultValue}
        ref={ref}
        {...rest}
      >
        {options.map((o, i) => {
          return (
            <label className={classNames.label} key={`${o}-${i}`}>
              <div className={classNames.itemContainer}>
                <RadioGroupRadix.Item className={classNames.item} value={o.value}>
                  <RadioGroupRadix.Indicator className={classNames.indicator} />
                </RadioGroupRadix.Item>

                <Typography variant={'body2'}>{o.label}</Typography>
              </div>
            </label>
          )
        })}
        <Typography className={classNames.error} component={'div'} variant={'body2'}>
          {error}
        </Typography>
      </RadioGroupRadix.Root>
    )
  }
)
