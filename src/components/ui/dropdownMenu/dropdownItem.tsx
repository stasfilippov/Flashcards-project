import { ComponentPropsWithoutRef } from 'react'

import * as DropdownMenuRadix from '@radix-ui/react-dropdown-menu'

import s from './dropdownMenu.module.scss'

type Props = ComponentPropsWithoutRef<typeof DropdownMenuRadix.Item>

export const DropdownItem = (props: Props) => {
  const { ...rest } = props

  return <DropdownMenuRadix.Item className={s.dropdownItem} {...rest} />
}
