import { ArrowIosDownOutline, ArrowIosUp } from '@/assets/icons/components'
import { Typography } from '@/components/ui'
import { TableHeadCell } from '@/components/ui/table/table'
import clsx from 'clsx'

import s from './table.module.scss'

export type SuperSortProps = {
  onChange: (newSort: string) => void
  sort: string
  sortBy: string
  sortable: boolean
  title: null | string
}

export const pureChange = (sort: string, down: string, up: string) => {
  switch (sort) {
    case '':
      return down
    case down:
      return up
    case up:
      return ''
    default:
      return down
  }
}
export const SuperSort = ({ onChange, sort, sortBy, sortable, title }: SuperSortProps) => {
  const up = '0' + sortBy
  const down = '1' + sortBy
  const sortHandler = () => {
    onChange(pureChange(sort, down, up))
  }

  const icon =
    // eslint-disable-next-line no-nested-ternary
    sort === down ? (
      <ArrowIosDownOutline width={12} />
    ) : sort === up ? (
      <ArrowIosUp width={12} />
    ) : (
      <span style={{ width: '12px' }}></span>
    )

  if (sortable) {
    return (
      <TableHeadCell id={sortBy} onClick={sortHandler}>
        <div className={clsx(s.tHeadCellWrapper)}>
          <Typography variant={'subtitle2'}>{title}</Typography>
          {icon}
        </div>
      </TableHeadCell>
    )
  } else {
    return <TableHeadCell id={sortBy} />
  }
}
