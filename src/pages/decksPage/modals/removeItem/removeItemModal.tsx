import { useState } from 'react'

import { TrashOutline } from '@/assets/icons/components'
import { Button, Modal, ModalProps, Typography } from '@/components/ui'
import clsx from 'clsx'

import s from './removeItemModal.module.scss'

type Props = {
  id: string
  name: string
  onRemove: (id: string) => Promise<void>
  type: 'Card' | 'Deck'
} & Omit<ModalProps, 'children' | 'open'>

export const RemoveItemModal = ({ id, name, onRemove, type, ...props }: Props) => {
  const [open, setOpen] = useState<boolean>(false)

  const openModalHandler = () => {
    setOpen(true)
  }
  const closeModalHandler = () => {
    setOpen(false)
  }

  const removeHandler = () => {
    onRemove(id).then(() => closeModalHandler())
  }

  const classNames = {
    buttonContainer: clsx(s.buttonsContainer),
    container: clsx(s.container),
    trigger: clsx(s.trigger),
  }

  return (
    <div className={classNames.container}>
      <button className={classNames.trigger} onClick={openModalHandler}>
        <TrashOutline width={16} />
      </button>
      <Modal onClose={closeModalHandler} open={open} title={`Delete ${type}`} {...props}>
        <Typography>
          Do you really want to remove <Typography variant={'subtitle1'}>{name}</Typography>?
        </Typography>
        <br />
        {type === 'Deck' && <Typography>All cards will be removed.</Typography>}
        <div className={classNames.buttonContainer}>
          <Button onClick={closeModalHandler} variant={'secondary'}>
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
