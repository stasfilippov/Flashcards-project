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

    const classNames = {
      checkbox: clsx(s.checkbox, {
        [s.checked]: checked,
        [s.disabled]: disabled,
      }),
      container: clsx(className, s.container),
      indicator: clsx(s.indicator, {
        [s.checked]: checked,
        [s.disabled]: disabled,
      }),
      label: clsx(s.label, { [s.disabled]: disabled }),
    }

    return (
      <Typography className={classNames.container} component={'div'} variant={'body2'}>
        <RadixLabel.Root className={classNames.label} htmlFor={id}>
          <RadixCheckbox.Root
            checked={checked}
            className={classNames.checkbox}
            disabled={disabled}
            id={id}
            ref={ref}
            {...rest}
          >
            <RadixCheckbox.Indicator className={classNames.indicator}>
              <Check />
            </RadixCheckbox.Indicator>
          </RadixCheckbox.Root>
          {label}
        </RadixLabel.Root>
      </Typography>
    )
  }
)
