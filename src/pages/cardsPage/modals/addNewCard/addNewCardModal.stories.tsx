import type { Meta, StoryObj } from '@storybook/react'

import { AddNewCardModal } from '@/pages/cardsPage/modals/addNewCard/addNewCardModal'
import { withRouter } from 'storybook-addon-remix-react-router'

const meta = {
  argTypes: {},
  component: AddNewCardModal,
  decorators: [withRouter],
  tags: ['autodocs'],
  title: 'Modals/AddNewCardModal',
} satisfies Meta<typeof AddNewCardModal>

export default meta
type Story = StoryObj<typeof meta>

export const CheckEmailDefault: Story = {}
