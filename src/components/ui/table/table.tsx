import { ComponentPropsWithoutRef, forwardRef, useState } from 'react'

import { ArrowIosDownOutline, ArrowIosUp } from '@/assets/icons/components'
import { Typography } from '@/components/ui'
import clsx from 'clsx'

import s from './table.module.scss'

const classNames = {
  tCell: clsx(s.tCell),
  tHeadCell: clsx(s.tHeadCell),
  tRow: clsx(s.trow),
  table: clsx(s.table),
}

const Table = forwardRef<HTMLTableElement, ComponentPropsWithoutRef<'table'>>(
  ({ className, ...props }, ref) => (
    <table className={clsx(classNames.table, className)} ref={ref} {...props} />
  )
)

const TableBody = forwardRef<HTMLTableSectionElement, ComponentPropsWithoutRef<'tbody'>>(
  ({ className, ...props }, ref) => <tbody className={clsx(className)} ref={ref} {...props} />
)

const TableRow = forwardRef<HTMLTableRowElement, ComponentPropsWithoutRef<'tr'>>(
  ({ className, ...props }, ref) => (
    <tr className={clsx(classNames.tRow, className)} ref={ref} {...props} />
  )
)

const TableHeadCell = forwardRef<HTMLTableCellElement, ComponentPropsWithoutRef<'th'>>(
  ({ className, ...props }, ref) => (
    <th className={clsx(classNames.tHeadCell, className)} ref={ref} {...props} />
  )
)

const TableCell = forwardRef<HTMLTableCellElement, ComponentPropsWithoutRef<'td'>>(
  ({ className, ...props }, ref) => (
    <td className={clsx(classNames.tCell, className)} ref={ref} {...props} />
  )
)

//-------------------------------------------------

export type Column = {
  id: string
  title: string
}

type PropsHeader = {
  columns: Column[]
} & ComponentPropsWithoutRef<'thead'>

const TableHeader = ({ className, columns, ...props }: PropsHeader) => {
  const [sort, setSort] = useState('')

  const onChangeSort = (newSort: string) => {
    // делает студент
    setSort(newSort)
  }

  return (
    <thead className={clsx(className)} {...props}>
      <TableRow>
        {columns.map(({ id, title }) => (
          <SuperSort key={id} onChange={onChangeSort} sort={sort} title={title} value={id} />
        ))}
      </TableRow>
    </thead>
  )
}

export type SuperSortProps = {
  onChange: (newSort: string) => void
  sort: string
  title: string
  value: string
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
const SuperSort = ({ onChange, sort, title, value }: SuperSortProps) => {
  const up = '0' + value
  const down = '1' + value
  const onChangeCallback = () => {
    onChange(pureChange(sort, down, up))
  }

  if (sort === down) {
    return (
      <TableHeadCell onClick={onChangeCallback}>
        <Typography variant={'subtitle2'}>{title}</Typography>
        <ArrowIosDownOutline width={12} />
      </TableHeadCell>
    )
  } else if (sort === up) {
    return (
      <TableHeadCell onClick={onChangeCallback}>
        <Typography variant={'subtitle2'}>{title}</Typography>
        <ArrowIosUp width={12} />
      </TableHeadCell>
    )
  } else {
    return (
      <TableHeadCell onClick={onChangeCallback}>
        <Typography variant={'subtitle2'}>{title}</Typography>
      </TableHeadCell>
    )
  }
}

export { Table, TableBody, TableCell, TableHeadCell, TableHeader, TableRow }
