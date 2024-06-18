import type { Meta, StoryObj } from '@storybook/react'

import { cardModal } from '@/pages/cardsPage/modals/addNewCard/cardModal'
import { withRouter } from 'storybook-addon-remix-react-router'

const meta = {
  argTypes: {},
  component: cardModal,
  decorators: [withRouter],
  tags: ['autodocs'],
  title: 'Modals/AddNewCardModal',
} satisfies Meta<typeof cardModal>

export default meta
type Story = StoryObj<typeof meta>

export const CheckEmailDefault: Story = {}
