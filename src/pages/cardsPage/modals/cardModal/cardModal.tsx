import { useEffect, useState } from 'react'
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
  defaultValues?: DefaultValueOfModal
} & Omit<ModalProps, 'children' | 'open'>
export const CardModal = ({ confirmHandler, defaultValues, title, ...props }: Props) => {
  const [open, setOpen] = useState(false)
  const [questionImg, setQuestionImg] = useState<File | null>(null)
  const [answerImg, setAnswerImg] = useState<File | null>(null)

  const [questionImgPreview, setQuestionImgPreview] = useState<null | string>('')
  const [answerImgPreview, setAnswerImgPreview] = useState<null | string>('')

  const [isQuestionImgDeleted, setQuestionImgDeleted] = useState(false)
  const [isAnswerImgDeleted, setAnswerImgDeleted] = useState(false)

  useEffect(() => {
    if (defaultValues?.previewImgQuestion || defaultValues?.previewImgAnswer) {
      setQuestionImgPreview(defaultValues?.previewImgQuestion)
      setAnswerImgPreview(defaultValues?.previewImgAnswer)
    }
  }, [defaultValues?.previewImgAnswer, defaultValues?.previewImgQuestion])

  useEffect(() => {
    let newPreview: null | string = null

    if (questionImg) {
      newPreview = URL.createObjectURL(questionImg)
      setQuestionImgPreview(newPreview)
    }

    return () => {
      if (newPreview) {
        URL.revokeObjectURL(newPreview)
      }
    }
  }, [questionImg])

  useEffect(() => {
    let newPreview: null | string = null

    if (answerImg) {
      newPreview = URL.createObjectURL(answerImg)
      setAnswerImgPreview(newPreview)
    }

    return () => {
      if (newPreview) {
        URL.revokeObjectURL(newPreview)
      }
    }
  }, [answerImg])

  const { control, handleSubmit, reset } = useForm<FormValues>({
    defaultValues: defaultValues,
    resolver: zodResolver(addCardSchema),
  })

  const submitHandler = handleSubmit(({ answer, question }) => {
    const newQuestionImg = questionImg ?? (isQuestionImgDeleted ? null : undefined)
    const newAnswerImg = answerImg ?? (isAnswerImgDeleted ? null : undefined)

    confirmHandler({ answer, answerImg: newAnswerImg, question, questionImg: newQuestionImg })
    reset()
    setAnswerImg(null)
    setQuestionImg(null)
    setOpen(false)
  })
  const openModalHandler = () => {
    setOpen(true)
  }
  const closeModalHandler = () => {
    reset()
    setAnswerImg(null)
    setQuestionImg(null)
    setAnswerImgPreview(defaultValues?.previewImgAnswer ?? null)
    setQuestionImgPreview(defaultValues?.previewImgQuestion ?? null)
    setOpen(false)
  }

  useEffect(() => {
    reset(defaultValues)
  }, [defaultValues, reset])

  const classNames = {
    buttonsWrapper: clsx(s.buttonsWrapper),
    input: clsx(s.input),
    inputWrapper: clsx(s.inputWrapper),
    modal: clsx(s.modal),
  }

  return (
    <div>
      {defaultValues ? (
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
              defaultValue={defaultValues?.question}
              label={'Question'}
              name={'question'}
            />
            <InputTypeFile
              cover={questionImg}
              label={'questionImg'}
              previewImg={questionImgPreview}
              setCover={setQuestionImg}
              setImageDeleted={setQuestionImgDeleted}
              setPreview={setQuestionImgPreview}
            />
          </div>
          <div className={classNames.inputWrapper}>
            <ControlledTextField
              className={classNames.input}
              control={control}
              defaultValue={defaultValues?.answer}
              label={'Answer'}
              name={'answer'}
            />
            <InputTypeFile
              cover={answerImg}
              label={'answerImg'}
              previewImg={answerImgPreview}
              setCover={setAnswerImg}
              setImageDeleted={setAnswerImgDeleted}
              setPreview={setAnswerImgPreview}
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
