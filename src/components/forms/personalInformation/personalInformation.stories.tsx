import type { Meta, StoryObj } from '@storybook/react'

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
  email: 'j&johnson@gmail.com',
  nickname: 'Ivan',
  photo: { alt: 'User photo', src: 'src/assets/img/avatar.png' },
}

export const PersonalInfo: Story = {
  args: {
    onSubmit: fn(),
    user,
  },
}
