import type { Meta, StoryObj } from '@storybook/react'

import { SignUpForm } from '@/components/forms/signUpForm/signUpForm'
import { withRouter } from 'storybook-addon-remix-react-router'

const meta = {
  argTypes: {},
  component: SignUpForm,
  decorators: [withRouter],
  tags: ['autodocs'],
  title: 'Components/SignUpForm',
} satisfies Meta<typeof SignUpForm>

export default meta
type Story = StoryObj<typeof meta>

export const SignUpFormExample: Story = {}
