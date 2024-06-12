import { Link, useSearchParams } from 'react-router-dom'

import { ArrowBackOutline } from '@/assets/icons/components'
import { ROUTES } from '@/common/constants'
import { Page } from '@/components/layout'
import {
  Button,
  Pagination,
  Table,
  TableBody,
  TableCellWithGrade,
  TableCellWithPhotoQuestions,
  TableCellWithText,
  TableHeader,
  TableRow,
  TextField,
  Typography,
} from '@/components/ui'
import { useGetCardsQuery, useGetDeckByIdQuery } from '@/pages/cardsPage/cardsApi'

import s from '@/components/ui/table/table.module.scss'

export const CardsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  const search = searchParams.get('question') ?? ''
  const currentPage = searchParams.get('page') ?? '1'
  const itemsPerPage = searchParams.get('items') ?? '10'

  const deckId = 'clqxwvbol01ymzk2v43xn1vxx'
  const currentUser = '5b2174ce-9499-4693-9a73-026e01cd9ed4'

  const searchChangeHandler = (value: string) => {
    value.length ? searchParams.set('question', value) : searchParams.delete('question')
    setSearchParams(searchParams)
  }

  const currentPageChangeHandler = (page: number) => {
    searchParams.set('page', page.toString())
    setSearchParams(searchParams)
  }
  const itemsPerPageChangeHandler = (itemsPerPage: number) => {
    searchParams.set('page', '1')
    searchParams.set('items', itemsPerPage.toString())
    setSearchParams(searchParams)
  }

  const {
    data: deck,
    error: errorDeck,
    isLoading: isLoadingDeck,
  } = useGetDeckByIdQuery({ id: deckId })
  const {
    data: cardsOfDeck,
    error: errorCardsOfDeck,
    isLoading: isLoadingCardsOfDeck,
  } = useGetCardsQuery({
    currentPage: +currentPage,
    id: deckId,
    itemsPerPage: +itemsPerPage,
    question: search,
  })
  const columns = [
    {
      id: 'question',
      title: 'Question',
    },
    {
      id: 'answer',
      title: 'Answer',
    },
    {
      id: 'updated',
      title: 'Last Updated',
    },
    {
      id: 'grade',
      sortable: false,
      title: 'Grade',
    },
  ]

  if (isLoadingDeck || isLoadingCardsOfDeck) {
    return <h1>Loading....</h1>
  }

  if (errorCardsOfDeck || errorDeck) {
    return <h1>Error {JSON.stringify(errorDeck)}</h1>
  }

  return (
    <Page>
      <div>
        <ArrowBackOutline width={16} />
        <Typography component={Link} to={ROUTES.base} variant={'body2'}>
          Back to Decks List
        </Typography>
      </div>
      <div>
        <Typography variant={'h1'}>{deck?.name}</Typography>
        {deck?.userId === currentUser ? (
          <Button>Add New Card</Button>
        ) : (
          <Button as={Link} to={ROUTES.learn}>
            Learn to Deck
          </Button>
        )}
      </div>
      <img alt={'image'} src={deck?.cover} style={{ width: '170px' }} />
      <TextField inputChangeHandler={searchChangeHandler} value={search} />
      <div>
        <div className={s.outerContainer}>
          <Table>
            <TableHeader columns={columns} />
            <TableBody>
              {cardsOfDeck?.items.map(card => {
                const updatedAt = new Date(card.updated).toLocaleDateString('ru-RU')

                return (
                  <TableRow key={card.id}>
                    <TableCellWithPhotoQuestions id={'question'} item={card}>
                      {card.question}
                    </TableCellWithPhotoQuestions>
                    <TableCellWithPhotoQuestions id={'answer'} item={card}>
                      {card.answer}
                    </TableCellWithPhotoQuestions>
                    <TableCellWithText id={'updatedQuestion'}>{updatedAt}</TableCellWithText>
                    <TableCellWithGrade id={'grade'} item={card} />
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </div>
      </div>
      <Pagination
        currentPage={+currentPage}
        itemsPerPage={+itemsPerPage}
        onItemsPerPageChange={itemsPerPageChangeHandler}
        onPageChange={currentPageChangeHandler}
        totalPages={cardsOfDeck?.pagination.totalPages}
      />
    </Page>
  )
}
