import { ComponentPropsWithoutRef, ReactNode } from 'react'

import { MoreVerticalOutline } from '@/assets/icons/components'
import * as DropdownMenuRadix from '@radix-ui/react-dropdown-menu'

import s from './dropdownMenu.module.scss'

type Props = {
  children?: ReactNode
  trigger?: ReactNode
} & ComponentPropsWithoutRef<typeof DropdownMenuRadix.Root>

export const DropdownMenu = (props: Props) => {
  const { children, trigger, ...rest } = props

  return (
    <DropdownMenuRadix.Root {...rest}>
      <DropdownMenuRadix.Trigger asChild>
        {trigger || <MoreVerticalOutline width={24} />}
      </DropdownMenuRadix.Trigger>
      <DropdownMenuRadix.Portal>
        <DropdownMenuRadix.Content className={s.dropdownContent} sideOffset={12}>
          {children}
          <DropdownMenuRadix.Arrow asChild className={s.triangleBox}>
            <div className={s.triangle}></div>
          </DropdownMenuRadix.Arrow>
        </DropdownMenuRadix.Content>
      </DropdownMenuRadix.Portal>
    </DropdownMenuRadix.Root>
  )
}
