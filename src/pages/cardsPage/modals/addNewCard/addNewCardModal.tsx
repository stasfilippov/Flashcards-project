import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { ControlledTextField } from '@/components/controlled'
import { Button, Modal, ModalProps } from '@/components/ui'
import { InputTypeFile } from '@/components/ui/inputTypeFile/inputTypeFile'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import s from '@/pages/decksPage/modals/addDeck/addDeckModal.module.scss'

const addCardSchema = z.object({
  answer: z.string().min(3).max(30),
  question: z.string().min(3).max(30),
})

type FormValues = z.infer<typeof addCardSchema>
type Props = {
  addCardHandler: (data: any) => void
} & Omit<ModalProps, 'children' | 'open'>
export const AddNewCardModal = ({ addCardHandler, ...props }: Props) => {
  const [open, setOpen] = useState(false)

  const { control, handleSubmit, reset } = useForm<FormValues>({
    resolver: zodResolver(addCardSchema),
  })
  const submitHandler = handleSubmit(data => {
    addCardHandler(data)
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

  return (
    <div>
      <Button onClick={openModalHandler} type={'button'}>
        Add New Card
      </Button>
      <Modal onClose={closeModalHandler} open={open} title={'Add New Card'} {...props}>
        <form onSubmit={submitHandler}>
          <ControlledTextField control={control} label={'Question'} name={'question'} />
          <InputTypeFile name={'questionImg'} />
          <ControlledTextField control={control} label={'Answer'} name={'answer'} />
          <InputTypeFile name={'answerImg'} />
          <div className={s.buttonsContainer}>
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
