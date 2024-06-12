import { ComponentPropsWithoutRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

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
  setOrderByHandler: (orderBy: string) => void
} & ComponentPropsWithoutRef<'thead'>

export const TableHeader = ({ className, columns, setOrderByHandler, ...props }: PropsHeader) => {
  const [sort, setSort] = useState('')
  const [searchParams, setSearchParams] = useSearchParams()

  const changeSortHandler = (newSort: string) => {
    searchParams.set('page', '1')

    setSort(newSort)
    setOrderByHandler(newSort)
    setSearchParams(searchParams)
  }

  console.log(sort)

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
