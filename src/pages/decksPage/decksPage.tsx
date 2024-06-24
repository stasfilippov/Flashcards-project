import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import { useDebounce } from '@/common/hooks'
import { Page } from '@/components/layout'
import { Pagination, Typography } from '@/components/ui'
import { useMeQuery } from '@/pages/auth/api/authApi'
import {
  useCreateDeckMutation,
  useGetDecksQuery,
  useGetMinMaxCardsQuery,
} from '@/pages/decksPage/api/decksApi'
import { CreateDeckArgs, SortValues } from '@/pages/decksPage/api/decksApi.types'
import { DecksPageFilters, DecksPageTable } from '@/pages/decksPage/components'
import { DeckModal } from '@/pages/decksPage/modals/deckModal/deckModal'

import s from './decksPage.module.scss'

export const DecksPage = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const { data: user } = useMeQuery()
  const { data: minMaxCards } = useGetMinMaxCardsQuery()

  const search = searchParams.get('name') ?? ''
  const sort = searchParams.get('sort') as SortValues
  const currentPage = searchParams.get('page') ?? '1'
  const itemsPerPage = searchParams.get('items') ?? '10'
  const currentTab = searchParams.get('tab') ?? ''

  const [decksRange, setDecksRange] = useState<number[]>([
    minMaxCards?.min ?? 0,
    minMaxCards?.max ?? 0,
  ])
  const debouncedSearchValue = useDebounce(search, 500)

  useEffect(() => {
    if (minMaxCards) {
      setDecksRange([minMaxCards.min, minMaxCards.max])
    }
  }, [minMaxCards])

  const { data: decks, error } = useGetDecksQuery({
    authorId: currentTab,
    currentPage: +currentPage,
    itemsPerPage: +itemsPerPage,
    maxCardsCount: decksRange[1],
    minCardsCount: decksRange[0],
    name: debouncedSearchValue,
    orderBy: sort,
  })

  const [createDeck] = useCreateDeckMutation()

  const clearFiltersHandler = () => {
    searchParams.delete('tab')
    setSearchParams({ ...searchParams, items: itemsPerPage })
    setDecksRange([minMaxCards?.min, minMaxCards?.max] as number[])
  }
  const changeItemsPerPageHandler = (itemsCount: number) => {
    searchParams.set('page', '1')
    searchParams.set('items', itemsCount.toString())
    setSearchParams(searchParams)
  }
  const changeCurrentPageHandler = (pageNumber: number) => {
    searchParams.set('page', pageNumber.toString())
    setSearchParams(searchParams)
  }
  const changeSearchValueHandler = (searchValue: string) => {
    if (searchValue.length) {
      searchParams.set('name', searchValue)
      setSearchParams(searchParams)
    } else {
      searchParams.delete('name')
      setSearchParams(searchParams)
    }
  }

  const createDeckHandler = (data: CreateDeckArgs) => {
    createDeck(data)
    clearFiltersHandler()
  }

  const showDecksHandler = (tabValue: string) => {
    searchParams.set('page', '1')
    if (tabValue) {
      searchParams.set('tab', tabValue)
    } else {
      searchParams.delete('tab')
    }
    setSearchParams(searchParams)
  }

  return (
    <Page>
      <div className={s.decksHeader}>
        <Typography component={'h1'} variant={'h1'}>
          Decks lists
        </Typography>
        <DeckModal confirmHandler={createDeckHandler} />
      </div>
      <DecksPageFilters
        changeSearchValue={changeSearchValueHandler}
        clearFilters={clearFiltersHandler}
        currentTabValue={currentTab}
        decksRangeValue={decksRange}
        maxRangeValue={minMaxCards?.max}
        searchValue={search}
        setCurrentTabValue={showDecksHandler}
        setDecksRangeValue={setDecksRange}
      />
      {error ? (
        <h1>Error: {JSON.stringify(error)}</h1>
      ) : decks ? (
        <>
          <DecksPageTable
            className={s.table}
            decks={decks.items}
            sortValue={sort}
            userId={user?.id ?? ''}
          />
          <Pagination
            currentPage={+currentPage}
            itemsPerPage={+itemsPerPage}
            onItemsPerPageChange={changeItemsPerPageHandler}
            onPageChange={changeCurrentPageHandler}
            totalPages={decks.pagination.totalPages}
          />
        </>
      ) : null}
    </Page>
  )
}
