import { Table, TableBody, TableRow } from '@/components/ui'
import {
  TableCellWithControls,
  TableCellWithPhotoDecks,
  TableCellWithText,
  TableHeader,
  formatDateToDdMmYY,
} from '@/components/ui/table'
import { Deck, SortBy, SortValues } from '@/pages/decksPage/api'

const ids: SortBy[] = ['name', 'cardsCount', 'updated', 'created', 'controls']
const titles = ['Name', 'Cards', 'Last Updated', 'Created by', '']

const columns = ids.map(id => ({
  id: id as SortBy,
  title: titles[ids.indexOf(id)],
}))

type Props = {
  className?: string
  decks: Deck[]
  sortValue: SortValues
  userId: string
}
export const DecksPageTable = ({ className, decks, sortValue, userId }: Props) => {
  return (
    <div className={className}>
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
    </div>
  )
}
