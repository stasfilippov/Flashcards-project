import { CSSProperties, ComponentPropsWithoutRef } from 'react'

import { commonStyles } from '@/common/styles'
import clsx from 'clsx'

type Props = {
  marginTop?: CSSProperties['marginTop']
} & ComponentPropsWithoutRef<'div'>

export const Page = ({ children, className, ...rest }: Props) => {
  const classNames = clsx(className, commonStyles.pageContainer)

  return (
    <div className={classNames} {...rest}>
      {children}
    </div>
  )
}
