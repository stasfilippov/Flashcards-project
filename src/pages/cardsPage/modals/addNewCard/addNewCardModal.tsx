import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { ControlledTextField } from '@/components/controlled'
import { Button, Modal, ModalProps } from '@/components/ui'
import { InputTypeFile } from '@/components/ui/inputTypeFile/inputTypeFile'
import { zodResolver } from '@hookform/resolvers/zod'
import clsx from 'clsx'
import { z } from 'zod'

import s from './addNewCardModal.module.scss'

const addCardSchema = z.object({
  answer: z.string().min(3).max(30),
  answerImg: z.string().optional(),
  question: z.string().min(3).max(30),
  questionImg: z.string().optional(),
})

export type FormValues = z.infer<typeof addCardSchema>
type Props = {
  addCardHandler: (data: any) => void
} & Omit<ModalProps, 'children' | 'open'>
export const AddNewCardModal = ({ addCardHandler, title, ...props }: Props) => {
  const [open, setOpen] = useState(false)

  const { control, handleSubmit, register, reset } = useForm<FormValues>({
    resolver: zodResolver(addCardSchema),
  })
  const submitHandler = handleSubmit(data => {
    // addCardHandler(data)
    console.log(data)
    reset()
    setOpen(false)
  })
  const openModalHandler = () => {
    setOpen(true)
  }
  const closeModalHandler = () => {
    reset()
    setOpen(false)
  }

  const classNames = {
    buttonsWrapper: clsx(s.buttonsWrapper),
    input: clsx(s.input),
    inputWrapper: clsx(s.inputWrapper),
  }

  return (
    <div>
      <Button onClick={openModalHandler} type={'button'}>
        {title}
      </Button>
      <Modal onClose={closeModalHandler} open={open} title={'Add New Card'} {...props}>
        <form onSubmit={submitHandler}>
          <div className={classNames.inputWrapper}>
            <ControlledTextField
              className={classNames.input}
              control={control}
              label={'Question'}
              name={'question'}
            />
            <InputTypeFile label={'questionImg'} register={register} />
          </div>
          <div className={classNames.inputWrapper}>
            <ControlledTextField
              className={classNames.input}
              control={control}
              label={'Answer'}
              name={'answer'}
            />
            <InputTypeFile label={'answerImg'} register={register} />
          </div>
          <div className={classNames.buttonsWrapper}>
            <Button onClick={closeModalHandler} variant={'secondary'}>
              Cancel
            </Button>
            <Button type={'submit'} variant={'primary'}>
              Add New Card
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
