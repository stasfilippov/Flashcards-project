import type { Meta, StoryObj } from '@storybook/react'

import { fn } from '@storybook/test'
import { withRouter } from 'storybook-addon-remix-react-router'

import { SignInForm } from './'

const meta = {
  component: SignInForm,
  decorators: [withRouter],
  tags: ['autodocs'],
  title: 'Forms/SignInForm',
} satisfies Meta<typeof SignInForm>

export default meta
type Story = StoryObj<typeof meta>

export const SignInFormDefault: Story = {
  args: {
    onSubmit: fn(),
  },
}
