import { Link } from 'react-router-dom'

import { ArrowBackOutline } from '@/assets/icons/components'
import { ROUTES } from '@/common/constants'
import { Typography } from '@/components/ui'
import clsx from 'clsx'

import s from './backNavigation.module.scss'

type Props = {
  className: string
}
export const BackNavigation = ({ className }: Props) => {
  const classNames = {
    link: clsx(s.link),
    wrapper: clsx(s.wrapper, className),
  }

  return (
    <div className={classNames.wrapper}>
      <ArrowBackOutline width={16} />
      <Typography className={classNames.link} component={Link} to={ROUTES.base} variant={'body2'}>
        Back to Decks List
      </Typography>
    </div>
  )
}
