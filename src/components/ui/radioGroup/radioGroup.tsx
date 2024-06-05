import { ElementRef, forwardRef } from 'react'

import { Typography } from '@/components/ui'
import * as RadioGroupRadix from '@radix-ui/react-radio-group'
import clsx from 'clsx'

import s from './radioGroup.module.scss'

type Options = {
  label: string
  value: string
}

export type RadioProps = {
  options: Options[]
} & RadioGroupRadix.RadioGroupProps

export const RadioGroup = forwardRef<ElementRef<typeof RadioGroupRadix.Root>, RadioProps>(
  ({ children, className, defaultValue, options, ...rest }) => {
    return (
      <RadioGroupRadix.Root
        className={clsx(s.radioGroupRoot, className)}
        defaultValue={defaultValue}
        {...rest}
      >
        {options.map((o, i) => {
          return (
            <label className={s.label} key={`${o}-${i}`}>
              <div className={s.radioGroupItemContainer}>
                <RadioGroupRadix.Item className={s.radioGroupItem} value={o.value}>
                  <RadioGroupRadix.Indicator className={s.radioGroupIndicator} />
                </RadioGroupRadix.Item>

                <Typography variant={'body2'}>{o.label}</Typography>
              </div>
            </label>
          )
        })}
      </RadioGroupRadix.Root>
    )
  }
)
