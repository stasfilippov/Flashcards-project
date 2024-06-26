import type { Meta, StoryObj } from '@storybook/react'

import { fn } from '@storybook/test'

import { CreateNewPasswordForm } from './'

const meta = {
  argTypes: {},
  component: CreateNewPasswordForm,
  tags: ['autodocs'],
  title: 'Forms/CreateNewPasswordForm',
} satisfies Meta<typeof CreateNewPasswordForm>

export default meta
type Story = StoryObj<typeof meta>

export const CreateNewPasswordFormExample: Story = {
  args: {
    onSubmit: fn(),
  },
}
