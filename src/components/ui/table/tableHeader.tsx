import { ComponentPropsWithoutRef } from 'react'

import { SuperSort } from '@/components/ui/table/superSort'
import { TableRow } from '@/components/ui/table/table'
import { SortValues } from '@/pages/decksPage'
import clsx from 'clsx'

export type Column = {
  /**
   * @param id - required for requests to the server for query-parameters, determines by which column the sorting is performed
   */
  id: string
  sortable?: boolean
  title: null | string
}

type PropsHeader = {
  columns: Column[]
  setSortValue: (sortValue: SortValues) => void
  sortValue: SortValues
} & ComponentPropsWithoutRef<'thead'>

export const TableHeader = ({
  className,
  columns,
  setSortValue,
  sortValue,
  ...props
}: PropsHeader) => {
  const changeSortHandler = (newSort: SortValues) => {
    console.log(newSort)
    setSortValue(newSort)
  }

  return (
    <thead className={clsx(className)} {...props}>
      <TableRow>
        {columns.map(({ id, sortable = true, title }) => (
          <SuperSort
            key={id}
            onChange={changeSortHandler}
            sort={sortValue}
            sortBy={id}
            sortable={sortable}
            title={title}
          />
        ))}
      </TableRow>
    </thead>
  )
}
