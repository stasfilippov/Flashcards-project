import { useParams, useSearchParams } from 'react-router-dom'

import { Page } from '@/components/layout'
import { TextField } from '@/components/ui'
import { useMeQuery } from '@/pages/auth/api/authApi'
import { useGetDeckByIdQuery } from '@/pages/cardsPage/api/cardsApi'
import { BackNavigation } from '@/pages/cardsPage/components/backNavigation/backNavigation'
import { HeaderOfCardsPage } from '@/pages/cardsPage/components/header/headerOfCardsPage'
import { TableWithCards } from '@/pages/cardsPage/components/tableWithCards/tableWithCards'
import { SortValues } from '@/pages/decksPage/api/decksApi.types'
import clsx from 'clsx'

import s from './cardsPage.module.scss'
export const CardsPage = () => {
  const { deckId } = useParams<{ deckId: string }>()
  const [searchParams, setSearchParams] = useSearchParams()

  const { data: user } = useMeQuery()

  const { data: deck, error, isLoading } = useGetDeckByIdQuery({ id: deckId ?? '' })

  const isMyDeck = user?.id === deck?.userId

  const search = searchParams.get('question') ?? ''
  const sort = searchParams.get('sort') as SortValues

  const classNames = {
    backNavigation: clsx(s.backNavigation),
    table: clsx(s.table),
    textField: clsx(s.textField),
  }
  const searchChangeHandler = (value: string) => {
    value.length ? searchParams.set('question', value) : searchParams.delete('question')
    setSearchParams(searchParams)
  }

  return (
    <Page>
      {error ? (
        <h1>Error {JSON.stringify(error)}</h1>
      ) : isLoading ? (
        <h1>Loading....</h1>
      ) : deck ? (
        <>
          <BackNavigation className={classNames.backNavigation} />
          <HeaderOfCardsPage deck={deck} isMy={isMyDeck} />
          <TextField
            className={classNames.textField}
            inputChangeHandler={searchChangeHandler}
            placeholder={'Input search'}
            type={'search'}
            value={search}
          />
          <TableWithCards
            className={classNames.table}
            deckId={deckId ?? ''}
            search={search}
            sort={sort}
            userId={user?.id ?? ''}
          />
        </>
      ) : null}
    </Page>
  )
}
