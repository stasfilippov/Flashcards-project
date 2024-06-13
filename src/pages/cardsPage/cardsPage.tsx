import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import { Page } from '@/components/layout'
import { Modal, TextField } from '@/components/ui'
import { useGetDeckByIdQuery } from '@/pages/cardsPage/cardsApi'
import { BackNavigation } from '@/pages/cardsPage/components/backNavigation'
import { Header } from '@/pages/cardsPage/components/header'
import { TableWithCards } from '@/pages/cardsPage/components/tableWithCards'

export const CardsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [open, setOpen] = useState<boolean>(false)
  const deckId = 'clqxwvbol01ymzk2v43xn1vxx'

  const search = searchParams.get('question') ?? ''

  const sort = searchParams.get('sort') ?? ''

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

  return (
    <Page>
      {error ? (
        <h1>Error {JSON.stringify(error)}</h1>
      ) : isLoading ? (
        <h1>Loading....</h1>
      ) : data ? (
        <>
          <BackNavigation />
          <Header callback={openModalHandler} deck={data} />
          <TextField inputChangeHandler={searchChangeHandler} value={search} />
          <TableWithCards deckId={deckId} search={search} sort={sort} />
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
