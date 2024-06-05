import { ComponentPropsWithoutRef, ElementRef, forwardRef, useId } from 'react'

import { Check } from '@/assets/icons/components'
import { Typography } from '@/components/ui'
import * as RadixCheckbox from '@radix-ui/react-checkbox'
import * as RadixLabel from '@radix-ui/react-label'
import clsx from 'clsx'

import s from './checkbox.module.scss'

export type CheckboxProps = {
  label?: string
} & ComponentPropsWithoutRef<typeof RadixCheckbox.Root>

export const Checkbox = forwardRef<ElementRef<typeof RadixCheckbox.Root>, CheckboxProps>(
  ({ checked, className, disabled, label, ...rest }: CheckboxProps, ref) => {
    let id = useId()

    if (rest.id) {
      id = rest.id
    }

    return (
      <Typography className={clsx(s.container, className)} component={'div'} variant={'body2'}>
        <RadixLabel.Root className={clsx(s.label, { [s.disabled]: disabled })} htmlFor={id}>
          <RadixCheckbox.Root
            checked={checked}
            className={clsx(s.checkbox, {
              [s.checked]: checked,
              [s.disabled]: disabled,
            })}
            disabled={disabled}
            id={id}
            ref={ref}
            {...rest}
          >
            <RadixCheckbox.Indicator
              className={clsx(s.indicator, {
                [s.checked]: checked,
                [s.disabled]: disabled,
              })}
            >
              {checked && <Check />}
            </RadixCheckbox.Indicator>
          </RadixCheckbox.Root>
          {label}
        </RadixLabel.Root>
      </Typography>
    )
  }
)
