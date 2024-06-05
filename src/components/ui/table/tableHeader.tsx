import { ComponentPropsWithoutRef, useState } from 'react'

import { SuperSort } from '@/components/ui/table/superSort'
import { TableRow } from '@/components/ui/table/table'
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
} & ComponentPropsWithoutRef<'thead'>

export const TableHeader = ({ className, columns, ...props }: PropsHeader) => {
  const [sort, setSort] = useState('')

  const changeSortHandler = (newSort: string) => {
    setSort(newSort)
  }

  return (
    <thead className={clsx(className)} {...props}>
      <TableRow>
        {columns.map(({ id, sortable = true, title }) => (
          <SuperSort
            key={id}
            onChange={changeSortHandler}
            sort={sort}
            sortBy={id}
            sortable={sortable}
            title={title}
          />
        ))}
      </TableRow>
    </thead>
  )
}
