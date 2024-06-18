import { useParams, useSearchParams } from 'react-router-dom'

import { ROUTES } from '@/common/constants'
import { Page } from '@/components/layout'
import { TextField } from '@/components/ui'
import { useGetDeckByIdQuery } from '@/pages/cardsPage/api/cardsApi'
import { BackNavigation } from '@/pages/cardsPage/components/backNavigation/backNavigation'
import { Header } from '@/pages/cardsPage/components/header/header'
import { TableWithCards } from '@/pages/cardsPage/components/tableWithCards/tableWithCards'
import { SortValues } from '@/pages/decksPage/api/decksApi.types'
import clsx from 'clsx'

import s from './cardsPage.module.scss'
export const CardsPage = () => {
  const { deckId } = useParams<{ deckId: string }>()
  const [searchParams, setSearchParams] = useSearchParams()

  //!- сделать получение currentUser
  const currentUser = '32c3f2f9-5fc9-4e34-b60c-a34a2f72727e'

  const { data, error, isLoading } = useGetDeckByIdQuery({ id: deckId ?? '' })

  const isMyDeck = currentUser === data?.userId

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
      ) : data ? (
        <>
          <BackNavigation
            className={classNames.backNavigation}
            pageName={'Decks Page'}
            route={ROUTES.base}
          />
          <Header deck={data} isMy={isMyDeck} />
          <TextField
            className={classNames.textField}
            inputChangeHandler={searchChangeHandler}
            placeholder={'Input search'}
            type={'search'}
            value={search}
          />
          <TableWithCards
            className={classNames.table}
            currentUser={currentUser}
            deckId={deckId ?? ''}
            search={search}
            sort={sort}
          />
        </>
      ) : null}
    </Page>
  )
}
