import { ComponentPropsWithoutRef, ReactNode } from 'react'

import { Close } from '@/assets/icons/components'
import { Typography } from '@/components/ui'
import * as Dialog from '@radix-ui/react-dialog'
import clsx from 'clsx'

import s from './modal.module.scss'
export type ModalProps = {
  children: ReactNode
  className?: string
  onClose?: () => void
  open: boolean
  title?: string
  withCloseBtn?: boolean
} & ComponentPropsWithoutRef<typeof Dialog.Content>

export const Modal = (props: ModalProps) => {
  const { children, className, onClose, open, title, withCloseBtn = true } = props

  const closeModalHandler = () => {
    onClose?.()
  }

  return (
    <Dialog.Root onOpenChange={closeModalHandler} open={open}>
      <Dialog.Portal>
        <Dialog.Overlay className={s.overlay}>
          <Dialog.Content className={clsx(s.modal, className)}>
            <div className={s.header}>
              <Dialog.Title asChild>
                <Typography variant={'h3'}>{title}</Typography>
              </Dialog.Title>
              {withCloseBtn && (
                <Dialog.Close asChild className={s.closeIcon}>
                  <Close width={24} />
                </Dialog.Close>
              )}
            </div>
            <div className={s.content}>
              <Typography variant={'body1'}>{children}</Typography>
            </div>
          </Dialog.Content>
        </Dialog.Overlay>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
