import type { Meta, StoryObj } from '@storybook/react'

import { RadioGroup } from './'

const meta = {
  argTypes: {
    disabled: {
      control: 'boolean',
    },
  },
  component: RadioGroup,
  tags: ['autodocs'],
  title: 'Components/RadioGroup',
} satisfies Meta<typeof RadioGroup>

export default meta
type Story = StoryObj<typeof meta>

export const RadioGroupDefault: Story = {
  args: {
    defaultValue: 'Radio',
    options: [
      { label: 'Default', value: 'Default' },
      { label: 'Radio', value: 'Radio' },
      { label: 'Group', value: 'Group' },
    ],
  },
}
export const RadioGroupDisabled: Story = {
  args: {
    disabled: true,
    options: [
      { label: 'Disabled', value: 'Disabled' },
      { label: 'Radio', value: 'Radio' },
      { label: 'Group', value: 'Group' },
    ],
  },
}
