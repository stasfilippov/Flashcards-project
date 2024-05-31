import type { Meta, StoryObj } from '@storybook/react'

import avatar from '@/assets/img/avatar.png'
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

export const HeaderWithButton: Story = {}
export const HeaderWithAvatar: Story = {
  args: {
    user: user,
  },
}
