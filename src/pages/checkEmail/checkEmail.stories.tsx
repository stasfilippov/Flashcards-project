import type { Meta, StoryObj } from '@storybook/react'

import { withRouter } from 'storybook-addon-remix-react-router'

import { CheckEmail } from './'

const meta = {
  argTypes: {},
  component: CheckEmail,
  decorators: [withRouter],
  tags: ['autodocs'],
  title: 'Forms/CheckEmail',
} satisfies Meta<typeof CheckEmail>

export default meta
type Story = StoryObj<typeof meta>

export const CheckEmailDefault: Story = {}
