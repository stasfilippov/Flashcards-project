import type { Meta, StoryObj } from '@storybook/react'

import { Checkbox } from './'

const meta = {
  argTypes: {
    checked: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
  },
  component: Checkbox,
  tags: ['autodocs'],
  title: 'Components/Checkbox',
} satisfies Meta<typeof Checkbox>

export default meta
type Story = StoryObj<typeof meta>

export const DefaultCheckbox: Story = {
  args: {
    label: 'Default Checkbox',
  },
}

export const DisabledCheckbox: Story = {
  args: {
    disabled: true,
    label: 'Disabled Checkbox',
  },
}
