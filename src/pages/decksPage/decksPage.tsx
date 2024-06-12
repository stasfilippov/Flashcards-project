import { useState } from 'react'

import { Page } from '@/components/layout'
import { Button, Pagination, Typography } from '@/components/ui'
import { DecksPageFilters } from '@/pages/decksPage/DecksPageFilters'
import { DecksPageTable } from '@/pages/decksPage/DecksPageTable'
import { useGetDecksQuery } from '@/pages/decksPage/decksApi'

import s from './DecksPage.module.scss'

export type SortValues =
  | 'author.name-asc'
  | 'author.name-desc'
  | 'cardsCount-asc'
  | 'cardsCount-desc'
  | 'created-asc'
  | 'created-desc'
  | 'name-asc'
  | 'name-desc'
  | 'updated-asc'
  | 'updated-desc'
  | null
  | undefined

export const DecksPage = () => {
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState<SortValues>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [currentTab, setCurrentTab] = useState('')
  const [decksRange, setDecksRange] = useState<number[]>([0, 100])

  const { data: decks, isLoading } = useGetDecksQuery({
    authorId: currentTab,
    currentPage,
    itemsPerPage,
    maxCardsCount: decksRange[1],
    minCardsCount: decksRange[0],
    name: search,
    orderBy: sort,
  })
  const clearFiltersHandler = () => {
    setSearch('')
    setCurrentTab('')
    setDecksRange([0, 100])
  }

  if (isLoading) {
    return <h1>Loading...</h1>
  }

  return (
    <Page>
      <div className={s.decksHeader}>
        <Typography component={'h1'} variant={'h1'}>
          Decks lists
        </Typography>
        <Button>Add new card</Button>
      </div>
      <DecksPageFilters
        clearFilters={clearFiltersHandler}
        currentTabValue={currentTab}
        decksRangeValue={decksRange}
        searchValue={search}
        setCurrentTabValue={setCurrentTab}
        setDecksRangeValue={setDecksRange}
        setSearchValue={setSearch}
      />
      <DecksPageTable decks={decks?.items} setSortValue={setSort} sortValue={sort} />
      <Pagination
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        onItemsPerPageChange={setItemsPerPage}
        onPageChange={setCurrentPage}
        totalPages={decks?.pagination.totalPages}
      />
    </Page>
  )
}
