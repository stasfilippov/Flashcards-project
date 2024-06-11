import type { Meta, StoryObj } from '@storybook/react'

import avatar from '@/assets/img/avatar.png'
import { fn } from '@storybook/test'
import { withRouter } from 'storybook-addon-remix-react-router'

import { PersonalInformation } from './'

const meta = {
  component: PersonalInformation,
  decorators: [withRouter],
  tags: ['autodocs'],
  title: 'Forms/PersonalInformation',
} satisfies Meta<typeof PersonalInformation>

export default meta
type Story = StoryObj<typeof meta>

const user = {
  avatar: avatar,
  email: 'j&johnson@gmail.com',
  name: 'Ivan',
}

export const PersonalInfo: Story = {
  args: {
    onSubmit: fn(),
    user,
  },
}
