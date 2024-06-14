import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import { Page } from '@/components/layout'
import { Modal, TextField } from '@/components/ui'
import { useGetDeckByIdQuery } from '@/pages/cardsPage/api/cardsApi'
import { BackNavigation } from '@/pages/cardsPage/components/backNavigation/backNavigation'
import { Header } from '@/pages/cardsPage/components/header/header'
import { TableWithCards } from '@/pages/cardsPage/components/tableWithCards/tableWithCards'
import { SortValues } from '@/pages/decksPage/api/decksApi.types'
import clsx from 'clsx'

import s from './cardsPage.module.scss'
export const CardsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [open, setOpen] = useState<boolean>(false)
  const deckId = 'clqxwvbol01ymzk2v43xn1vxx'
  const currentUser = '5b2174ce-9499-4693-9a73-026e01cd9ed4'

  const search = searchParams.get('question') ?? ''
  const sort = searchParams.get('sort') as SortValues

  const classNames = {
    backNavigation: clsx(s.backNavigation),
    table: clsx(s.table),
    textField: clsx(s.textField),
  }
  const openModalHandler = () => {
    setOpen(true)
  }
  const closeModalHandler = () => {
    setOpen(false)
  }
  const searchChangeHandler = (value: string) => {
    value.length ? searchParams.set('question', value) : searchParams.delete('question')
    setSearchParams(searchParams)
  }

  const { data, error, isLoading } = useGetDeckByIdQuery({ id: deckId })

  const isMyDeck = currentUser === data?.userId

  return (
    <Page>
      {error ? (
        <h1>Error {JSON.stringify(error)}</h1>
      ) : isLoading ? (
        <h1>Loading....</h1>
      ) : data ? (
        <>
          <BackNavigation className={classNames.backNavigation} />
          <Header callback={openModalHandler} deck={data} isMy={isMyDeck} />
          <TextField
            className={classNames.textField}
            inputChangeHandler={searchChangeHandler}
            placeholder={'Input search'}
            type={'search'}
            value={search}
          />
          <TableWithCards
            className={classNames.table}
            deckId={deckId}
            isMy={isMyDeck}
            search={search}
            sort={sort}
          />
          <Modal onClose={closeModalHandler} open={open}>
            <div>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda consequuntur eos
              laboriosam ullam. A aliquid aperiam consequuntur, delectus earum harum itaque laborum,
            </div>
          </Modal>
        </>
      ) : null}
    </Page>
  )
}
