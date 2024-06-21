import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

import { Edit2Outline } from '@/assets/icons/components'
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

type FormValues = z.infer<typeof addDeckSchema>
type Props = {
  confirmHandler: (data: { cover?: File | null | string } & FormValues) => void
  defaultValues?: { cover?: null | string } & FormValues
} & Omit<ModalProps, 'children' | 'open'>

export const DeckModal = ({ confirmHandler, defaultValues, ...props }: Props) => {
  const [open, setOpen] = useState(false)
  const [cover, setCover] = useState<File | null>(null)
  const [previewSource, setPreviewSource] = useState<null | string>('')

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
    defaultValues: defaultValues,
    resolver: zodResolver(addDeckSchema),
  })

  const submitHandler = handleSubmit(data => {
    confirmHandler({ ...data, cover: cover ?? defaultValues?.cover ?? null })
    reset()
    setCover(null)
    setPreviewSource(defaultValues?.cover ?? null)
    setOpen(false)
  })

  const openModalHandler = () => {
    setOpen(true)
  }

  const closeModalHandler = () => {
    reset()
    setCover(null)
    setPreviewSource(defaultValues?.cover ?? null)
    setOpen(false)
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
      {defaultValues ? (
        <button onClick={openModalHandler}>
          <Edit2Outline width={16} />
        </button>
      ) : (
        <Button onClick={openModalHandler}>Add new Deck</Button>
      )}
      <Modal onClose={closeModalHandler} open={open} title={'Add New Deck'} {...props}>
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
            setPreview={setPreviewSource}
          />
          <ControlledCheckbox control={control} label={'Private pack'} name={'isPrivate'} />
          <div className={s.buttonsContainer}>
            <Button onClick={closeModalHandler} variant={'secondary'}>
              Cancel
            </Button>
            <Button type={'submit'} variant={'primary'}>
              Add new Deck
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
