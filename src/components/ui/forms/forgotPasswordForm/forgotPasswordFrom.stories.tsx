import type { Meta, StoryObj } from '@storybook/react'

import { withRouter } from 'storybook-addon-remix-react-router'

import { ForgotPasswordForm } from './index'

const meta = {
  argTypes: {},
  component: ForgotPasswordForm,
  decorators: [withRouter],
  tags: ['autodocs'],
  title: 'Forms/ForgotPasswordForm',
} satisfies Meta<typeof ForgotPasswordForm>

export default meta
type Story = StoryObj<typeof meta>

export const SignInFormDefault: Story = {}
