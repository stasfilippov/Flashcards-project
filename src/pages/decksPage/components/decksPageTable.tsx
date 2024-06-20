import { Table, TableBody, TableRow } from '@/components/ui'
import { TableCellWithControls } from '@/components/ui/table/tableCell/tableCellWithControls'
import { TableCellWithPhotoDecks } from '@/components/ui/table/tableCell/tableCellWithPhotoDecks'
import { TableCellWithText } from '@/components/ui/table/tableCell/tableCellWithText'
import { TableHeader } from '@/components/ui/table/tableHeader'
import { formatDateToDdMmYY } from '@/components/ui/table/utils/convertDate'
import { Deck, SortBy, SortValues } from '@/pages/decksPage/api/decksApi.types'

const ids: SortBy[] = ['name', 'cardsCount', 'updated', 'created', 'controls']
const titles = ['Name', 'Cards', 'Last Updated', 'Created by', '']

const columns = ids.map(id => ({
  id: id as SortBy,
  title: titles[ids.indexOf(id)],
}))

type Props = {
  decks: Deck[]
  sortValue: SortValues
  userId: string
}
export const DecksPageTable = ({ decks, sortValue, userId }: Props) => {
  // const currentUser=

  return (
    <Table>
      <TableHeader columns={columns} sortValue={sortValue} />
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
            <TableCellWithControls
              id={'controls'}
              item={{ deck }}
              userId={userId}
              variant={'Deck'}
            />
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
