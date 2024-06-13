import { useSearchParams } from 'react-router-dom'

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
import { SortBy } from '@/components/ui/table/superSort'
import { TableCellWithControls } from '@/components/ui/table/tableCell/tableCellWithControls'
import { useGetCardsQuery } from '@/pages/cardsPage/cardsApi'
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
  isMy: boolean
  search: string
  sort: string
}
export const TableWithCards = ({ className, deckId, isMy, search, sort }: Props) => {
  const [searchParams, setSearchParams] = useSearchParams()

  const currentPage = searchParams.get('page') ?? '1'
  const itemsPerPage = searchParams.get('items') ?? '10'

  const { data, error, isLoading } = useGetCardsQuery({
    currentPage: +currentPage,
    id: deckId,
    itemsPerPage: +itemsPerPage,
    orderBy: sort,
    question: search,
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
                      id={'control'}
                      isMy={isMy}
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
