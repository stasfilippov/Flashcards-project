import { ComponentPropsWithoutRef } from 'react'

import { Typography } from '@/components/ui'
import { TableCell } from '@/components/ui/table'
import clsx from 'clsx'

import s from '@/components/ui/table/table.module.scss'

type Props = {
  id: string
} & ComponentPropsWithoutRef<'td'>
export const TableCellWithText = ({ children, id, ...rest }: Props) => {
  const classNames = {
    tCell: clsx(s.tCell),
  }

  return (
    <TableCell className={classNames.tCell} id={id} {...rest}>
      <Typography variant={'body2'}>{children}</Typography>
    </TableCell>
  )
}
