import { useSearchParams } from 'react-router-dom'

import { useDebounce } from '@/common/hooks'
import {
  Pagination,
  Spinner,
  Table,
  TableBody,
  TableCellWithGrade,
  TableCellWithPhotoQuestions,
  TableCellWithText,
  TableHeader,
  TableRow,
  Typography,
} from '@/components/ui'
import { TableCellWithControls } from '@/components/ui/table'
import { useGetCardsQuery } from '@/pages/cardsPage/api'
import { SortBy, SortValues } from '@/pages/decksPage/api'
import clsx from 'clsx'

import s from '@/components/ui/table/table.module.scss'

const ids: SortBy[] = ['question', 'answer', 'updated', 'grade', 'controls']
const titles = ['Question', 'Answer', 'Last Updated', 'Grade', '']

const columns = ids.map(id => ({
  id: id as SortBy,
  title: titles[ids.indexOf(id)],
}))

type Props = {
  className: string
  deckId: string
  search: string
  sort: SortValues
  userId: string
}
export const TableWithCards = ({ className, deckId, search, sort, userId }: Props) => {
  const [searchParams, setSearchParams] = useSearchParams()
  const debouncedSearchValue = useDebounce(search, 500)

  const currentPage = searchParams.get('page') ?? '1'
  const itemsPerPage = searchParams.get('items') ?? '10'

  const { data, error, isLoading } = useGetCardsQuery({
    currentPage: +currentPage,
    id: deckId,
    itemsPerPage: +itemsPerPage,
    orderBy: sort,
    question: debouncedSearchValue,
  })

  const currentPageChangeHandler = (page: number) => {
    searchParams.set('page', page.toString())
    setSearchParams(searchParams)
  }
  const itemsPerPageChangeHandler = (itemsPerPage: number) => {
    searchParams.set('page', '1')
    searchParams.set('items', itemsPerPage.toString())
    setSearchParams(searchParams)
  }

  const classNames = {
    emptyTable: clsx(s.emptyTable),
    loaderWrapper: clsx(s.loaderWrapper),
    tableWrapper: clsx(s.outerContainer, className),
  }

  if (error) {
    return <h1>Error {JSON.stringify(error)}</h1>
  }

  if (isLoading) {
    return (
      <div className={classNames.loaderWrapper}>
        <Spinner />
      </div>
    )
  }

  return (
    <div>
      {data && data.items.length > 0 ? (
        <>
          <div className={classNames.tableWrapper}>
            <Table>
              <TableHeader columns={columns} sortValue={sort} />
              <TableBody>
                {data.items.map(card => {
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
                      <TableCellWithControls
                        id={'control'}
                        item={{ card }}
                        userId={userId}
                        variant={'Card'}
                      />
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </div>
          <Pagination
            currentPage={+currentPage}
            itemsPerPage={+itemsPerPage}
            onItemsPerPageChange={itemsPerPageChangeHandler}
            onPageChange={currentPageChangeHandler}
            totalPages={data?.pagination.totalPages}
          />
        </>
      ) : (
        <div className={classNames.emptyTable}>
          <Typography variant={'body1'}>This deck is empty.</Typography>
        </div>
      )}
    </div>
  )
}
