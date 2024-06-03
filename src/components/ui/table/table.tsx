import { ComponentPropsWithoutRef, forwardRef } from 'react'

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
  ({ className, id, ...props }, ref) => (
    <th className={clsx(classNames.tHeadCell, className)} id={id} ref={ref} {...props} />
  )
)

const TableCell = forwardRef<HTMLTableCellElement, ComponentPropsWithoutRef<'td'>>(
  ({ className, ...rest }, ref) => {
    const classNames = {
      cell: clsx(className, s.tableCell),
    }

    return <td className={classNames.cell} {...rest} ref={ref} />
  }
)

export { Table, TableBody, TableCell, TableHeadCell, TableRow }
