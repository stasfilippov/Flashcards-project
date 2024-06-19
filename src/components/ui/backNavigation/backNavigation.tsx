import { Link } from 'react-router-dom'

import { ArrowBackOutline } from '@/assets/icons/components'
import { Typography } from '@/components/ui'
import clsx from 'clsx'

import s from './backNavigation.module.scss'

type Props = {
  className?: string
  pageName: string
  route: string
}
export const BackNavigation = ({ className, pageName, route }: Props) => {
  const classNames = {
    link: clsx(s.link),
    wrapper: clsx(s.wrapper, className),
  }

  return (
    <div className={classNames.wrapper}>
      <ArrowBackOutline width={16} />
      <Typography className={classNames.link} component={Link} to={route} variant={'body2'}>
        Back to {pageName}
      </Typography>
    </div>
  )
}
