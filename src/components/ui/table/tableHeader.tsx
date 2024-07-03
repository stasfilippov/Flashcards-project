import { ComponentPropsWithoutRef } from 'react'
import { useSearchParams } from 'react-router-dom'

import { SortBy, SortValues } from '@/pages/decksPage/api'
import clsx from 'clsx'

import { TableRow } from './'
import { SuperSort } from './superSort'

export type Column = {
  /**
   * @param id - required for requests to the server for query-parameters, determines by which column the sorting is performed
   */
  id: SortBy
  sortable?: boolean
  title: null | string
}

type PropsHeader = {
  columns: Column[]
  sortValue: SortValues
} & ComponentPropsWithoutRef<'thead'>

export const TableHeader = ({ className, columns, sortValue, ...props }: PropsHeader) => {
  const [searchParams, setSearchParams] = useSearchParams()

  const changeSortHandler = (newSort: string) => {
    searchParams.set('page', '1')
    searchParams.set('sort', newSort ?? '')
    setSearchParams(searchParams)
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
