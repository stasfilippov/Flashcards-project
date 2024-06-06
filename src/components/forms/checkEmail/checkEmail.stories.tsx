import type { Meta, StoryObj } from '@storybook/react'

import { CheckEmail } from '@/components/forms/checkEmail/checkEmail'
import { withRouter } from 'storybook-addon-remix-react-router'

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
