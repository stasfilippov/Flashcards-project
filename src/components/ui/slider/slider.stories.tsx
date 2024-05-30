import type { Meta, StoryObj } from '@storybook/react'

import { useState } from 'react'

import { Slider } from './'

const meta = {
  component: Slider,
  tags: ['autodocs'],
  title: 'Components/Slider',
} satisfies Meta<typeof Slider>

export default meta
type Story = StoryObj<typeof Slider>

const SingleSlider = () => {
  const [value, setValue] = useState([50])

  return <Slider onValueChange={setValue} value={value} />
}
const DoubleSlider = () => {
  const [value, setValue] = useState([10, 80])

  return <Slider minStepsBetweenThumbs={1} onValueChange={setValue} value={value} />
}

export const Single: Story = {
  render: () => <SingleSlider />,
}
export const Double: Story = {
  render: () => <DoubleSlider />,
}
