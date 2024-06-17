import { useSearchParams } from 'react-router-dom'

import { useDebounce } from '@/common/hooks'
import {
  Pagination,
  Table,
  TableBody,
  TableCellWithGrade,
  TableCellWithPhotoQuestions,
  TableCellWithText,
  TableHeader,
  TableRow,
} from '@/components/ui'
import { TableCellWithControls } from '@/components/ui/table/tableCell/tableCellWithControls'
import { useGetCardsQuery } from '@/pages/cardsPage/api/cardsApi'
import { SortBy, SortValues } from '@/pages/decksPage/api/decksApi.types'
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
  currentUser: string
  deckId: string
  search: string
  sort: SortValues
}
export const TableWithCards = ({ className, currentUser, deckId, search, sort }: Props) => {
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
    tableWrapper: clsx(s.outerContainer, className),
  }

  return (
    <>
      <div className={classNames.tableWrapper}>
        <Table>
          <TableHeader columns={columns} sortValue={sort} />
          {error ? (
            <h1>Error {JSON.stringify(error)}</h1>
          ) : isLoading ? (
            <h1>Loading....</h1>
          ) : data ? (
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
                      currentUser={currentUser}
                      id={'control'}
                      item={{ card }}
                      variant={'Card'}
                    />
                  </TableRow>
                )
              })}
            </TableBody>
          ) : null}
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
  )
}
