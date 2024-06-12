import { Table, TableBody, TableRow } from '@/components/ui'
import { TableCellWithControls } from '@/components/ui/table/tableCell/tableCellWithControls'
import { TableCellWithPhotoDecks } from '@/components/ui/table/tableCell/tableCellWithPhotoDecks'
import { TableCellWithText } from '@/components/ui/table/tableCell/tableCellWithText'
import { TableHeader } from '@/components/ui/table/tableHeader'
import { formatDateToDdMmYY } from '@/components/ui/table/utils/convertDate'
import { Deck, SortValues } from '@/pages/decksPage/decksApi.types'

const columns = [
  {
    id: 'name',
    title: 'Name',
  },
  {
    id: 'cardsCount',
    title: 'Cards',
  },
  {
    id: 'updated',
    title: 'Last Updated',
  },
  {
    id: 'created',
    title: 'Created by',
  },
  {
    id: 'controls',
    sortable: false,
    title: null,
  },
]

type Props = {
  changeSortValue: (sortValue: SortValues) => void
  decks: Deck[] | undefined
  sortValue: SortValues
}
export const DecksPageTable = ({ changeSortValue, decks, sortValue }: Props) => {
  return (
    <Table>
      <TableHeader changeSortValue={changeSortValue} columns={columns} sortValue={sortValue} />
      <TableBody>
        {decks?.map(deck => (
          <TableRow key={deck.id}>
            <TableCellWithPhotoDecks id={'name'} item={deck}>
              {deck.name}
            </TableCellWithPhotoDecks>
            <TableCellWithText id={'cardsCount'}>{deck.cardsCount}</TableCellWithText>
            <TableCellWithText id={'updatedDeck'}>
              {formatDateToDdMmYY(deck.updated)}
            </TableCellWithText>
            <TableCellWithText id={'created'}>{deck.author.name}</TableCellWithText>
            <TableCellWithControls id={'controls'} item={deck} />
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
