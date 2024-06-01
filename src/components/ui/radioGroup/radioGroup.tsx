import { Typography } from '@/components/ui'
import * as RadioGroupRadix from '@radix-ui/react-radio-group'

import s from './radioGroup.module.scss'

type Props = {
  options: string[]
} & RadioGroupRadix.RadioGroupProps

export const RadioGroup = ({ children, className, defaultValue, options, ...rest }: Props) => {
  return (
    <form className={className}>
      <RadioGroupRadix.Root className={s.radioGroupRoot} defaultValue={defaultValue} {...rest}>
        {options.map((o, i) => {
          return (
            <label className={s.label} key={`${o}-${i}`}>
              <div className={s.radioGroupItemContainer}>
                <RadioGroupRadix.Item className={s.radioGroupItem} value={o}>
                  <RadioGroupRadix.Indicator className={s.radioGroupIndicator} />
                </RadioGroupRadix.Item>

                <Typography variant={'body2'}>{o}</Typography>
              </div>
            </label>
          )
        })}
      </RadioGroupRadix.Root>
    </form>
  )
}
