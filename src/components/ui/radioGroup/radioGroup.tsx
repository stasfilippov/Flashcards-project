import { Typography } from '@/components/ui'
import * as RadioGroupRadix from '@radix-ui/react-radio-group'
import { v4 } from 'uuid'

import s from './radioGroup.module.scss'

type Props = {
  options: any[]
} & RadioGroupRadix.RadioGroupProps

export const RadioGroup = ({ children, className, defaultValue, options, ...rest }: Props) => {
  const radioGroupOptions = options.map(o => {
    return { id: v4(), value: o }
  })

  return (
    <form className={className}>
      <RadioGroupRadix.Root className={s.radioGroupRoot} defaultValue={defaultValue} {...rest}>
        {radioGroupOptions.map(o => {
          return (
            <div className={s.radioGroupItemContainer} key={o.id}>
              <RadioGroupRadix.Item className={s.radioGroupItem} id={o.id} value={o.value}>
                <RadioGroupRadix.Indicator className={s.radioGroupIndicator} />
              </RadioGroupRadix.Item>
              <label className={s.label} htmlFor={o.id}>
                <Typography variant={'body2'}>{o.value}</Typography>
              </label>
            </div>
          )
        })}
      </RadioGroupRadix.Root>
    </form>
  )
}
