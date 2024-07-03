import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

import { ControlledCheckbox, ControlledTextField } from '@/components/controlled'
import { Button, Modal, ModalProps } from '@/components/ui'
import { InputTypeFile } from '@/components/ui/inputTypeFile/inputTypeFile'
import { zodResolver } from '@hookform/resolvers/zod'
import clsx from 'clsx'
import { z } from 'zod'

import s from './deckModal.module.scss'

const addDeckSchema = z.object({
  isPrivate: z.boolean().default(false),
  name: z.string().min(3).max(30),
})

export type DeckModalDefaultValues = { cover?: null | string } & FormValues
export type DeckModalConfirmHandlerArgs = { cover?: File | null | undefined } & FormValues

type FormValues = z.infer<typeof addDeckSchema>
type Props = {
  closeModal: () => void
  confirmHandler: (data: DeckModalConfirmHandlerArgs) => void
  defaultValues?: DeckModalDefaultValues
  isOpen: boolean
} & Omit<ModalProps, 'children' | 'open'>

export const DeckModal = ({
  closeModal,
  confirmHandler,
  defaultValues,
  isOpen,
  ...props
}: Props) => {
  const [cover, setCover] = useState<File | null>(null)
  const [previewSource, setPreviewSource] = useState<null | string>('')
  const [isImageDeleted, setImageDeleted] = useState(false)

  useEffect(() => {
    if (defaultValues?.cover) {
      setPreviewSource(defaultValues.cover)
    }
  }, [defaultValues?.cover])

  useEffect(() => {
    let newPreview: null | string = null

    if (cover) {
      newPreview = URL.createObjectURL(cover)
      setPreviewSource(newPreview)
    }

    return () => {
      if (newPreview) {
        URL.revokeObjectURL(newPreview)
      }
    }
  }, [cover])

  const { control, handleSubmit, reset } = useForm<FormValues>({
    defaultValues,
    resolver: zodResolver(addDeckSchema),
  })

  const submitHandler = handleSubmit(data => {
    const newCover = cover ?? (isImageDeleted ? null : undefined)
    const dataToSend = { ...data, cover: newCover }

    confirmHandler(dataToSend)
    reset()
    setCover(null)
    closeModal()
  })

  const closeModalHandler = () => {
    reset()
    setCover(null)
    setPreviewSource(defaultValues?.cover ?? null)
    closeModal()
  }

  useEffect(() => {
    reset(defaultValues)
  }, [defaultValues, reset])

  const classNames = {
    container: clsx(s.container),
    input: clsx(s.input),
    inputTypeFileWrapper: clsx(s.inputTypeFileWrapper),
  }

  return (
    <div className={classNames.container}>
      <Modal
        onClose={closeModalHandler}
        open={isOpen}
        title={defaultValues ? 'Update Deck' : 'Add New Deck'}
        {...props}
      >
        <form onSubmit={submitHandler}>
          <ControlledTextField
            className={classNames.input}
            control={control}
            label={'Name Pack'}
            name={'name'}
          />
          <InputTypeFile
            className={classNames.inputTypeFileWrapper}
            cover={cover}
            label={'deckImg'}
            previewImg={previewSource}
            setCover={setCover}
            setImageDeleted={setImageDeleted}
            setPreview={setPreviewSource}
          />
          <ControlledCheckbox control={control} label={'Private pack'} name={'isPrivate'} />
          <div className={s.buttonsContainer}>
            <Button onClick={closeModalHandler} variant={'secondary'}>
              Cancel
            </Button>
            <Button type={'submit'} variant={'primary'}>
              {defaultValues ? 'Update Deck' : 'Add New Deck'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
