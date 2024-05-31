import type { Meta, StoryObj } from '@storybook/react'

import {
  Edit2Outline,
  LogOutOutline,
  PersonOutline,
  PlayCircleOutline,
  TrashOutline,
} from '@/assets/icons/components'
import { Avatar } from '@/components/ui/avatar'
import { Typography } from '@/components/ui/typography'

import s from './styleForStories.module.scss'

import { DropdownItem } from './dropdownItem'
import { DropdownMenu } from './dropdownMenu'
import { DropdownSeparator } from './dropdownSeparator'

const meta = {
  component: DropdownMenu,
  tags: ['autodocs'],
  title: 'Components/DropdownMenu',
} satisfies Meta<typeof DropdownMenu>

export default meta
type Story = StoryObj<typeof meta>
const user = {
  email: 'j&johnson@gmail.com',
  name: 'Ivan',
  photo: { alt: 'User photo', src: 'src/assets/img/avatar.png' },
}

export const Default: Story = {
  args: {
    children: (
      <>
        <DropdownItem>
          <PlayCircleOutline width={16} />
          <Typography variant={'caption'}>Learn</Typography>
        </DropdownItem>
        <DropdownSeparator />
        <DropdownItem>
          <Edit2Outline width={16} />
          <Typography variant={'caption'}>Edit</Typography>
        </DropdownItem>
        <DropdownSeparator />
        <DropdownItem>
          <TrashOutline width={16} />
          <Typography variant={'caption'}>Delete</Typography>
        </DropdownItem>
      </>
    ),
  },
}

export const WithUser: Story = {
  args: {
    children: (
      <>
        <DropdownItem>
          <div className={s.userInfo}>
            <Avatar src={user.photo.src} />
            <div className={s.infoBlock}>
              <Typography variant={'subtitle2'}>{user.name}</Typography>
              <Typography className={s.email} variant={'caption'}>
                {user.email}
              </Typography>
            </div>
          </div>
        </DropdownItem>
        <DropdownSeparator />
        <DropdownItem>
          <PersonOutline width={16} />
          <Typography variant={'caption'}>My Profile</Typography>
        </DropdownItem>
        <DropdownSeparator />
        <DropdownItem>
          <LogOutOutline width={16} />
          <Typography variant={'caption'}>Sign Out</Typography>
        </DropdownItem>
      </>
    ),
    trigger: (
      <div className={s.triggerBox}>
        <Avatar src={user.photo.src} />
      </div>
    ),
  },
}
