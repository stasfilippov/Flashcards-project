import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { Edit2Outline } from '@/assets/icons/components'
import { ControlledTextField } from '@/components/controlled'
import { Button, Modal, ModalProps } from '@/components/ui'
import { useEditCardMutation } from '@/pages/cardsPage/api/cardsApi'
import { Card, EditCardArgs } from '@/pages/cardsPage/api/cardsApi.types'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const addCardSchema = z.object({
  answer: z.string().min(3).max(30),
  question: z.string().min(3).max(30),
})

export type FormValues = z.infer<typeof addCardSchema>
type Props = {
  item: Card
} & Omit<ModalProps, 'children' | 'open'>
export const EditCardModal = ({ item, ...props }: Props) => {
  const [open, setOpen] = useState(false)
  const [questionImg, setQuestionImg] = useState(item.questionImg)
  const [answerImg, setAnswerImg] = useState(item.answerImg)
  const [updateCard] = useEditCardMutation()

  const { control, handleSubmit, reset } = useForm<FormValues>({
    defaultValues: { answer: item.answer, question: item.question },
    resolver: zodResolver(addCardSchema),
  })
  const submitHandler = handleSubmit(({ answer, question }) => {
    const updatedCard: EditCardArgs = {
      answer,
      answerImg: answerImg ?? '',
      id: item.id,
      question,
      questionImg: questionImg ?? '',
    }

    updateCard(updatedCard)
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
      <button onClick={openModalHandler}>
        <Edit2Outline width={16} />
      </button>
      <Modal
        // className={classNames.modal}
        onClose={closeModalHandler}
        open={open}
        title={'Edit Card'}
        {...props}
      >
        <form onSubmit={submitHandler}>
          <div>
            <ControlledTextField
              // className={classNames.input}
              control={control}
              label={'Question'}
              name={'question'}
            />
            {/*добавить defaultValue*/}
            <InputTypeFile label={'questionImg'} setUploadImgHandler={setQuestionImg} />
          </div>
          {/*className={classNames.inputWrapper}*/}
          <div>
            <ControlledTextField
              // className={classNames.input}
              control={control}
              label={'Answer'}
              name={'answer'}
            />
            <InputTypeFile label={'answerImg'} setUploadImgHandler={setAnswerImg} />
          </div>
          {/*className={classNames.buttonsWrapper}*/}
          <div>
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
