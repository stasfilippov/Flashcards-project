import type { Meta, StoryObj } from '@storybook/react'

import { useState } from 'react'

import { Button } from '@/components/ui/button'

import { Modal } from './'

const meta = {
  component: Modal,
  tags: ['autodocs'],
  title: 'Components/Modal',
} satisfies Meta<typeof Modal>

export default meta
type Story = StoryObj<typeof Modal>

type Props = {
  title: string
  withCloseBtn?: boolean
}

const ModalWithState = (props: Props) => {
  const [open, setOpen] = useState<boolean>(false)

  const openModalHandler = () => {
    setOpen(true)
  }
  const closeModalHandler = () => {
    setOpen(false)
  }

  return (
    <>
      <Button onClick={openModalHandler}>Open modal</Button>
      <Modal onClose={closeModalHandler} open={open} {...props}>
        <div>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda consequuntur eos
          laboriosam ullam. A aliquid aperiam consequuntur, delectus earum harum itaque laborum,
          magnam, minima perspiciatis porro quaerat quas quia quis veritatis. Adipisci aliquam animi
          commodi laboriosam minus modi odit provident sequi tenetur voluptatum? A architecto
          doloremque ea earum eos error facere fugiat, inventore ipsum libero modi nemo omnis
          pariatur perferendis quae quas quidem quisquam quo quod sed sunt totam unde vel veniam
          vero. Amet autem fuga numquam praesentium tempora! Dolorem eligendi enim fuga molestiae
          mollitia nostrum numquam, omnis pariatur perferendis provident quae, quia sed vero?
          Delectus dolor repudiandae saepe voluptatem.
        </div>
      </Modal>
    </>
  )
}

export const Default: Story = {
  render: () => <ModalWithState title={'Lorem ipsum dolor'} />,
}
export const WithoutCloseButton: Story = {
  render: () => <ModalWithState title={'Lorem ipsum dolor'} withCloseBtn={false} />,
}
