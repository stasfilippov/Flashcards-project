import type { Meta, StoryObj } from '@storybook/react'

import avatar from '@/assets/img/avatar.png'
import { fn } from '@storybook/test'
import { withRouter } from 'storybook-addon-remix-react-router'

import { Header } from './'

const meta = {
  argTypes: {},
  component: Header,
  decorators: [withRouter],
  tags: ['autodocs'],
  title: 'Layout/Header',
} satisfies Meta<typeof Header>

export default meta
type Story = StoryObj<typeof meta>

const user = {
  nickname: 'Ivan',
  photo: { src: avatar },
}

export const HeaderWithButton: Story = {
  args: {
    onLogout: fn(),
  },
}
export const HeaderWithAvatar: Story = {
  args: {
    onLogout: fn(),
    user: {
      avatar: user.photo.src,
      email: 'boris@ivan.com',
      name: user.nickname,
    },
  },
}
