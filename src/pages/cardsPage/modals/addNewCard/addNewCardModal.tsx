import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { ControlledTextField } from '@/components/controlled'
import { Button, Modal, ModalProps } from '@/components/ui'
import { InputTypeFile } from '@/components/ui/inputTypeFile/inputTypeFile'
import { useCreateNewCardMutation } from '@/pages/cardsPage/api/cardsApi'
import { CreateCardArgs } from '@/pages/cardsPage/api/cardsApi.types'
import { zodResolver } from '@hookform/resolvers/zod'
import clsx from 'clsx'
import { z } from 'zod'

import s from './addNewCardModal.module.scss'

const addCardSchema = z.object({
  answer: z.string().min(3).max(30),
  question: z.string().min(3).max(30),
})

export type FormValues = z.infer<typeof addCardSchema>
type Props = {
  addCardHandler: (data: any) => void
  deckId: string
} & Omit<ModalProps, 'children' | 'open'>
export const AddNewCardModal = ({ addCardHandler, deckId, title, ...props }: Props) => {
  const [open, setOpen] = useState(false)
  const [questionImg, setQuestionImg] = useState('')
  const [answerImg, setAnswerImg] = useState('')

  const [createCard] = useCreateNewCardMutation()

  const { control, handleSubmit, reset } = useForm<FormValues>({
    defaultValues: { answer: '', question: '' },
    resolver: zodResolver(addCardSchema),
  })
  const submitHandler = handleSubmit(({ answer, question }) => {
    const newCard: CreateCardArgs = { answer, answerImg, id: deckId, question, questionImg }

    createCard(newCard)
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
    modal: clsx(s.modal),
  }

  return (
    <div>
      <Button onClick={openModalHandler} type={'button'}>
        {title}
      </Button>
      <Modal
        className={classNames.modal}
        onClose={closeModalHandler}
        open={open}
        title={'Add New Card'}
        {...props}
      >
        <form onSubmit={submitHandler}>
          <div className={classNames.inputWrapper}>
            <ControlledTextField
              className={classNames.input}
              control={control}
              label={'Question'}
              name={'question'}
            />
            <InputTypeFile label={'questionImg'} setUploadImgHandler={setQuestionImg} />
          </div>
          <div className={classNames.inputWrapper}>
            <ControlledTextField
              className={classNames.input}
              control={control}
              label={'Answer'}
              name={'answer'}
            />
            <InputTypeFile label={'answerImg'} setUploadImgHandler={setAnswerImg} />
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
