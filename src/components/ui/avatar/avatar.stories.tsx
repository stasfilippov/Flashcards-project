import type { Meta, StoryObj } from '@storybook/react'

import avatar from '@/assets/img/avatar.png'

import { Avatar } from './'

const meta = {
  argTypes: {},
  component: Avatar,
  tags: ['autodocs'],
  title: 'Components/Avatar',
} satisfies Meta<typeof Avatar>

export default meta
type Story = StoryObj<typeof meta>

export const AvatarWithPhotoSmall: Story = {
  args: {
    src: avatar,
  },
}
export const AvatarWithPhotoLarge: Story = {
  args: {
    size: 'large',
    src: avatar,
  },
}

export const AvatarWithoutPhotoSmall: Story = {}
export const AvatarWithoutPhotoLarge: Story = {
  args: {
    size: 'large',
  },
}
