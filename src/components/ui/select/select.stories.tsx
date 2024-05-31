import type { Meta, StoryObj } from '@storybook/react'

import { CSSProperties, useState } from 'react'

import { Select } from './'

const meta = {
  component: Select,
  tags: ['autodocs'],
  title: 'Components/Select',
} satisfies Meta<typeof Select>

export default meta
type Story = StoryObj<typeof Select>
const options = [
  {
    label: 'Apple',
    value: 'apple',
  },
  {
    label: 'Banana',
    value: 'banana',
  },
  {
    label: 'Blueberry',
    value: 'blueberry',
  },
  {
    label: 'Grapes',
    value: 'grapes',
  },
  {
    label: 'Pineapple',
    value: 'pineapple',
  },
  {
    label: 'Cherry',
    value: 'cherry',
  },
  {
    label: 'Grapefruit',
    value: 'grapefruit',
  },
  {
    label: 'Lemon',
    value: 'lemon',
  },
]

type Props = {
  disabled?: boolean
  label?: string
  placeholder?: string
  width?: CSSProperties['width']
}
const SelectWithState = (props: Props) => {
  const [value, setValue] = useState('')

  return (
    <>
      <Select onValueChange={setValue} options={options} value={value} {...props} />
      <div>Current value: {value}</div>
    </>
  )
}

export const Default: Story = {
  render: () => <SelectWithState />,
}
export const WithPlaceholder: Story = {
  render: () => <SelectWithState placeholder={'Select fruit...'} />,
}
export const WithLabel: Story = {
  render: () => <SelectWithState label={'Fruit:'} placeholder={'Select fruit...'} />,
}
export const WithWidth: Story = {
  render: () => (
    <SelectWithState label={'Fruit:'} placeholder={'Select fruit...'} width={'210px'} />
  ),
}
export const Disabled: Story = {
  render: () => (
    <SelectWithState disabled label={'Fruit:'} placeholder={'Select fruit...'} width={'210px'} />
  ),
}
