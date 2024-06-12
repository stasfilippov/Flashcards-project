import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import { Page } from '@/components/layout'
import { Button, Pagination, Typography } from '@/components/ui'
import { useGetDecksQuery } from '@/pages/decksPage/decksApi'
import { SortValues } from '@/pages/decksPage/decksApi.types'
import { DecksPageFilters } from '@/pages/decksPage/decksPageFilters'
import { DecksPageTable } from '@/pages/decksPage/decksPageTable'

import s from './decksPage.module.scss'

export const DecksPage = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  const search = searchParams.get('name') ?? ''
  const sort = searchParams.get('sort') as SortValues
  const currentPage = searchParams.get('page') ?? '1'
  const itemsPerPage = searchParams.get('items') ?? '10'

  const [currentTab, setCurrentTab] = useState('')
  const [decksRange, setDecksRange] = useState<number[]>([0, 100])

  const {
    data: decks,
    error,
    isLoading,
  } = useGetDecksQuery({
    authorId: currentTab,
    currentPage: +currentPage,
    itemsPerPage: +itemsPerPage,
    maxCardsCount: decksRange[1],
    minCardsCount: decksRange[0],
    name: search,
    orderBy: sort || null,
  })

  const clearFiltersHandler = () => {
    setSearchParams({ items: itemsPerPage, page: currentPage })
    setCurrentTab('')
    setDecksRange([0, 100])
  }
  const changeItemsPerPageHandler = (itemsCount: number) => {
    setSearchParams({
      items: itemsCount.toString(),
      name: search,
      page: '1',
      sort: sort ?? '',
    })
  }
  const changeCurrentPageHandler = (pageNumber: number) => {
    setSearchParams({
      items: itemsPerPage,
      name: search,
      page: pageNumber.toString(),
      sort: sort ?? '',
    })
  }
  const changeSearchValueHandler = (searchValue: string) => {
    setSearchParams({
      items: itemsPerPage,
      name: searchValue,
      sort: sort ?? '',
    })
  }
  const changeSortValueHandler = (sortValue: SortValues) => {
    setSearchParams({
      items: itemsPerPage,
      name: search,
      sort: sortValue ?? '',
    })
  }

  if (isLoading) {
    return <h1>Loading...</h1>
  }
  if (error) {
    return <h1>Error: {JSON.stringify(error)}</h1>
  }

  return (
    <Page>
      <div className={s.decksHeader}>
        <Typography component={'h1'} variant={'h1'}>
          Decks lists
        </Typography>
        <Button>Add New Deck</Button>
      </div>
      <DecksPageFilters
        changeSearchValue={changeSearchValueHandler}
        clearFilters={clearFiltersHandler}
        currentTabValue={currentTab}
        decksRangeValue={decksRange}
        searchValue={search}
        setCurrentTabValue={setCurrentTab}
        setDecksRangeValue={setDecksRange}
      />
      <DecksPageTable
        changeSortValue={changeSortValueHandler}
        decks={decks?.items}
        sortValue={sort}
      />
      <Pagination
        currentPage={+currentPage}
        itemsPerPage={+itemsPerPage}
        onItemsPerPageChange={changeItemsPerPageHandler}
        onPageChange={changeCurrentPageHandler}
        totalPages={decks?.pagination.totalPages}
      />
    </Page>
  )
}
