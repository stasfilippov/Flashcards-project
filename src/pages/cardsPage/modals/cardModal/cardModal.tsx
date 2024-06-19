import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { Edit2Outline } from '@/assets/icons/components'
import { ControlledTextField } from '@/components/controlled'
import { Button, Modal, ModalProps } from '@/components/ui'
import { InputTypeFile } from '@/components/ui/inputTypeFile/inputTypeFile'
import { CreateCardArgs } from '@/pages/cardsPage/api/cardsApi.types'
import { zodResolver } from '@hookform/resolvers/zod'
import clsx from 'clsx'
import { z } from 'zod'

import s from './cardModal.module.scss'

const addCardSchema = z.object({
  answer: z.string().min(3).max(30),
  question: z.string().min(3).max(30),
})

export type FormValues = z.infer<typeof addCardSchema>

export type DefaultValueOfModal = {
  answer: string
  previewImgAnswer: null | string
  previewImgQuestion: null | string
  question: string
}

type Props = {
  confirmHandler: (data: Omit<CreateCardArgs, 'id'>) => void
  defaultValueOfModal: DefaultValueOfModal
} & Omit<ModalProps, 'children' | 'open'>
export const CardModal = ({ confirmHandler, defaultValueOfModal, title, ...props }: Props) => {
  const [open, setOpen] = useState(false)
  const [questionImg, setQuestionImg] = useState<File | null>(null)
  const [answerImg, setAnswerImg] = useState<File | null>(null)

  const { control, handleSubmit, reset } = useForm<FormValues>({
    defaultValues: defaultValueOfModal,
    resolver: zodResolver(addCardSchema),
  })

  const submitHandler = handleSubmit(({ answer, question }) => {
    confirmHandler({ answer, answerImg, question, questionImg })
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
      {defaultValueOfModal ? (
        <button onClick={openModalHandler}>
          <Edit2Outline width={16} />
        </button>
      ) : (
        <Button onClick={openModalHandler} type={'button'}>
          {title}
        </Button>
      )}
      <Modal
        className={classNames.modal}
        onClose={closeModalHandler}
        open={open}
        title={title}
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
            <InputTypeFile
              label={'questionImg'}
              previewImg={defaultValueOfModal?.previewImgQuestion}
              setUploadImgHandler={setQuestionImg}
            />
          </div>
          <div className={classNames.inputWrapper}>
            <ControlledTextField
              className={classNames.input}
              control={control}
              label={'Answer'}
              name={'answer'}
            />
            <InputTypeFile
              label={'answerImg'}
              previewImg={defaultValueOfModal?.previewImgAnswer}
              setUploadImgHandler={setAnswerImg}
            />
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
