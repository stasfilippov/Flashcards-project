import { Button, Modal, ModalProps, Typography } from '@/components/ui'
import { RemoveItemArgs } from '@/pages/decksPage/api/decksApi.types'
import clsx from 'clsx'

import s from './removeItemModal.module.scss'

type Props = {
  closeModal: () => void
  id: string
  isOpen: boolean
  name: string
  onRemove: (data: RemoveItemArgs) => void
  type: 'Card' | 'Deck'
} & Omit<ModalProps, 'children' | 'open'>

export const RemoveItemModal = ({
  closeModal,
  id,
  isOpen,
  name,
  onRemove,
  type,
  ...props
}: Props) => {
  const removeHandler = () => {
    onRemove({ id })
    closeModal()
  }

  const classNames = {
    buttonContainer: clsx(s.buttonsContainer),
    container: clsx(s.container),
  }

  return (
    <div className={classNames.container}>
      <Modal onClose={closeModal} open={isOpen} title={`Delete ${type}`} {...props}>
        <Typography>
          Do you really want to remove <Typography variant={'subtitle1'}>{name}</Typography>?
        </Typography>
        <br />
        {type === 'Deck' && <Typography>All cards will be removed.</Typography>}
        <div className={classNames.buttonContainer}>
          <Button onClick={closeModal} variant={'secondary'}>
            Cancel
          </Button>
          <Button onClick={removeHandler} variant={'primary'}>
            Delete {type}
          </Button>
        </div>
      </Modal>
    </div>
  )
}
