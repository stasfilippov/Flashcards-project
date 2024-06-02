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
  ({ className, ...props }, ref) => (
    <th className={clsx(classNames.tHeadCell, className)} ref={ref} {...props} />
  )
)

export { Table, TableBody, TableHeadCell, TableRow }
