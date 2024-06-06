import { ComponentPropsWithoutRef } from 'react'

import { Typography } from '@/components/ui'
import { SelectItem } from '@/components/ui/select/selectItem'
import { ChevronDownIcon } from '@radix-ui/react-icons'
import * as SelectRadix from '@radix-ui/react-select'
import clsx from 'clsx'

import s from './select.module.scss'

export type Option = { label: number | string; value: string }
export type SelectProps = {
  className?: string
  label?: string
  options: Option[]
  placeholder?: string
  variant?: 'pagination' | 'primary'
} & ComponentPropsWithoutRef<typeof SelectRadix.Root>

export const Select = (props: SelectProps) => {
  const { className, label, options, placeholder, variant = 'primary', ...rest } = props
  const classNames = {
    content: clsx(s.selectContent, s[variant]),
    item: clsx(s.selectItem, s[variant]),
    trigger: clsx(s.selectTrigger, s[variant], className),
  }

  return (
    <div className={s.selectBox}>
      {label && (
        <Typography className={s.label} variant={'body2'}>
          {label}
        </Typography>
      )}
      <SelectRadix.Root {...rest}>
        <SelectRadix.Trigger className={classNames.trigger}>
          <SelectRadix.Value placeholder={placeholder} />
          <SelectRadix.Icon className={s.selectIcon}>
            <ChevronDownIcon />
          </SelectRadix.Icon>
        </SelectRadix.Trigger>
        <SelectRadix.Portal>
          <SelectRadix.Content className={classNames.content} position={'popper'} sideOffset={-2}>
            <SelectRadix.Viewport>
              <SelectRadix.Group>
                {options.map((o, i) => (
                  <SelectItem className={classNames.item} key={`${i} ${o.value}`} value={o.value}>
                    {o.label}
                  </SelectItem>
                ))}
              </SelectRadix.Group>
            </SelectRadix.Viewport>
          </SelectRadix.Content>
        </SelectRadix.Portal>
      </SelectRadix.Root>
    </div>
  )
}
