import { useParams, useSearchParams } from 'react-router-dom'

import { ROUTES } from '@/common/constants'
import { Page } from '@/components/layout'
import { BackNavigation, TextField } from '@/components/ui'
import { useMeQuery } from '@/pages/auth/api'
import { SortValues, useGetDeckByIdQuery } from '@/pages/decksPage/api'
import clsx from 'clsx'

import s from './cardsPage.module.scss'

import { HeaderOfCardsPage, TableWithCards } from './components'

export const CardsPage = () => {
  const { deckId } = useParams<{ deckId: string }>()
  const [searchParams, setSearchParams] = useSearchParams()

  const { data: user } = useMeQuery()

  const { data: deck, error } = useGetDeckByIdQuery({ id: deckId ?? '' })

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
      ) : deck ? (
        <>
          <BackNavigation
            className={classNames.backNavigation}
            pageName={'Decks Page'}
            route={ROUTES.base}
          />
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
