import { ComponentPropsWithoutRef } from 'react'

import { Star, StarOutline } from '@/assets/icons/components'
import { TableCell } from '@/components/ui/table'
import { QuestionAnswer } from '@/components/ui/table/types'
import clsx from 'clsx'

import s from '@/components/ui/table/table.module.scss'

type Props = {
  id: string
  item: QuestionAnswer
} & ComponentPropsWithoutRef<'td'>
export const TableCellWithGrade = ({ children, id, item, ...rest }: Props) => {
  const gradeCount = 5
  const stars = Array(gradeCount).fill(0)

  const classNames = {
    star: clsx(s.star),
    starOutline: clsx(s.starOutline),
    tCell: clsx(s.tCell),
  }

  return (
    <TableCell className={classNames.tCell} id={id} {...rest}>
      {stars.map((s, index) =>
        index <= item.grade ? (
          <Star className={classNames.star} key={`${index + s}`} width={16} />
        ) : (
          <StarOutline className={classNames.starOutline} key={`${index + s}`} width={16} />
        )
      )}
    </TableCell>
  )
}
