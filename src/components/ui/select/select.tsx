import { CSSProperties, ComponentPropsWithoutRef } from 'react'

import { Typography } from '@/components/ui'
import { SelectItem } from '@/components/ui/select/selectItem'
import { ChevronDownIcon } from '@radix-ui/react-icons'
import * as SelectRadix from '@radix-ui/react-select'
import clsx from 'clsx'

import s from './select.module.scss'

type Option = { label: number | string; value: number | string }
type Props = {
  className?: string
  label?: string
  options: Option[]
  placeholder?: string
  width?: CSSProperties['width']
} & ComponentPropsWithoutRef<typeof SelectRadix.Root>

export const Select = (props: Props) => {
  const { className, label, options, placeholder, width = '100%', ...rest } = props
  const widthStyle = { width }

  const onCloseFocus = (e: Event) => {
    e.preventDefault()
  }

  return (
    <div className={s.selectBox} style={widthStyle}>
      {label && (
        <Typography className={s.label} variant={'body2'}>
          {label}
        </Typography>
      )}
      <SelectRadix.Root {...rest}>
        <SelectRadix.Trigger className={clsx(s.selectTrigger, className)}>
          <SelectRadix.Value placeholder={placeholder} />
          <SelectRadix.Icon className={s.selectIcon}>
            <ChevronDownIcon />
          </SelectRadix.Icon>
        </SelectRadix.Trigger>
        <SelectRadix.Portal>
          <SelectRadix.Content
            className={s.selectContent}
            collisionPadding={0}
            onCloseAutoFocus={onCloseFocus}
            position={'popper'}
          >
            <SelectRadix.Viewport>
              {options.map(option => (
                <SelectItem key={option.value} value={option.value.toString()}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectRadix.Viewport>
          </SelectRadix.Content>
        </SelectRadix.Portal>
      </SelectRadix.Root>
    </div>
  )
}
