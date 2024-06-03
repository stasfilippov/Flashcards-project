import { ComponentPropsWithoutRef } from 'react'

import { Edit2Outline, PlayCircleOutline, TrashOutline } from '@/assets/icons/components'
import { TableCell } from '@/components/ui/table'
import { Deck } from '@/components/ui/table/tableCell/tableCellWithPhotoDecks'
import clsx from 'clsx'

import s from '@/components/ui/table/table.module.scss'

type Props = {
  id: string
  item: Deck
} & ComponentPropsWithoutRef<'td'>
export const TableCellWithControls = ({ children, id, item, ...rest }: Props) => {
  //later here we need to get the current user with useSelector
  const currentUser = 'Пупсик'

  const classNames = {
    tCell: clsx(s.tCell),
    tCellControlsWrapper: clsx(s.tCellControlsWrapper),
    tCellImageOfDeck: clsx(s.tableCellImage),
  }

  return (
    <TableCell className={classNames.tCell} {...rest}>
      {currentUser === item.author.name ? (
        <div className={classNames.tCellControlsWrapper}>
          <button>
            <Edit2Outline width={16} />
          </button>
          <button disabled={!item.cardsCount}>
            <PlayCircleOutline width={16} />
          </button>
          <button>
            <TrashOutline width={16} />
          </button>
        </div>
      ) : (
        <div className={classNames.tCellControlsWrapper}>
          <button disabled={!item.cardsCount}>
            <PlayCircleOutline width={16} />
          </button>
        </div>
      )}
    </TableCell>
  )
}
