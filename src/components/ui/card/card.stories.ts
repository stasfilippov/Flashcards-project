import type { Meta, StoryObj } from '@storybook/react'

import { Card } from './'

const meta = {
  argTypes: {},
  component: Card,
  tags: ['autodocs'],
  title: 'Components/Card',
} satisfies Meta<typeof Card>

export default meta
type Story = StoryObj<typeof meta>

export const CardWithTitle: Story = {
  args: {
    style: {
      height: '552px',
      width: '420px',
    },
    title: 'Sign up',
  },
}

export const CardWithoutTitle: Story = {
  args: {
    style: {
      height: '552px',
      width: '420px',
    },
  },
}
