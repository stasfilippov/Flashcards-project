import type { Meta, StoryObj } from '@storybook/react'

import { SignUpForm } from '@/components/forms/signUpForm/signUpForm'
import { fn } from '@storybook/test'
import { withRouter } from 'storybook-addon-remix-react-router'

const meta = {
  args: {
    onSubmit: fn(),
  },
  component: SignUpForm,
  decorators: [withRouter],
  tags: ['autodocs'],
  title: 'Forms/SignUpForm',
} satisfies Meta<typeof SignUpForm>

export default meta
type Story = StoryObj<typeof meta>

export const SignUpFormExample: Story = {}
