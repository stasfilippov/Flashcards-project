import { ComponentPropsWithoutRef } from 'react'

import { Typography } from '@/components/ui'
import * as SliderRadix from '@radix-ui/react-slider'

import s from './slider.module.scss'
type Props = ComponentPropsWithoutRef<typeof SliderRadix.Root>
export const Slider = ({ value = [50], ...rest }: Props) => {
  const withTwoThumbs = value.length > 1

  return (
    <div className={s.sliderContainer}>
      {withTwoThumbs && (
        <div className={s.valueBox}>
          <Typography variant={'body1'}>{value[0]}</Typography>
        </div>
      )}
      <SliderRadix.Root
        className={s.sliderRoot}
        minStepsBetweenThumbs={1}
        step={1}
        value={value}
        {...rest}
      >
        <SliderRadix.Track className={s.sliderTrack}>
          <SliderRadix.Range className={s.sliderRange} />
        </SliderRadix.Track>
        {value?.map((_, i) => <SliderRadix.Thumb className={s.sliderThumb} key={i} />)}
      </SliderRadix.Root>
      <div className={s.valueBox}>
        <Typography variant={'body1'}>{withTwoThumbs ? value[1] : value[0]}</Typography>
      </div>
    </div>
  )
}
