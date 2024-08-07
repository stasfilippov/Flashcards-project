import { ArrowIosDownOutline, ArrowIosUp } from '@/assets/icons/components'
import { Typography } from '@/components/ui'
import { SortBy, SortValues } from '@/pages/decksPage/api'
import clsx from 'clsx'

import s from './table.module.scss'

import { TableHeadCell } from './'

export type SuperSortProps = {
  onChange: (newSort: string) => void
  sort: SortValues
  sortBy: SortBy
  sortable: boolean
  title: null | string
}

export const pureChange = (sort: SortValues, down: string, up: string) => {
  switch (sort) {
    case null:
      return down
    case down:
      return up
    case up:
      return 'null'
    default:
      return down
  }
}
export const SuperSort = ({ onChange, sort, sortBy, sortable, title }: SuperSortProps) => {
  const up = sortBy + '-asc'
  const down = sortBy + '-desc'
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
    return (
      <TableHeadCell id={sortBy}>
        <div className={clsx(s.tHeadCellWrapper)}>
          <Typography variant={'subtitle2'}>{title}</Typography>
        </div>
      </TableHeadCell>
    )
  }
}
