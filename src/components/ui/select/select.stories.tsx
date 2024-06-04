import type { Meta, StoryObj } from '@storybook/react'

import { useState } from 'react'

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
  variant?: 'pagination'
}
const SelectWithState = (props: Props) => {
  const [value, setValue] = useState('')

  return (
    <div style={{ width: '220px' }}>
      <Select onValueChange={setValue} options={options} value={value} {...props} />
      <div>Current value: {value}</div>
    </div>
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
export const ForPagination: Story = {
  render: () => <SelectWithState placeholder={'Select fruit...'} variant={'pagination'} />,
}
export const Disabled: Story = {
  render: () => <SelectWithState disabled label={'Fruit:'} placeholder={'Select fruit...'} />,
}
