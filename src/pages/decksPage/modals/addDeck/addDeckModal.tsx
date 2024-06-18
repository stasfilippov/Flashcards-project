import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { ControlledCheckbox, ControlledTextField } from '@/components/controlled'
import { Button, Modal, ModalProps } from '@/components/ui'
import { InputTypeFile } from '@/components/ui/inputTypeFile/inputTypeFile'
import { CreateDeckArgs } from '@/pages/decksPage/api/decksApi.types'
import { zodResolver } from '@hookform/resolvers/zod'
import clsx from 'clsx'
import { z } from 'zod'

import s from './addDeckModal.module.scss'

const addDeckSchema = z.object({
  isPrivate: z.boolean().default(false),
  name: z.string().min(3).max(30),
})

type FormValues = z.infer<typeof addDeckSchema>
type Props = {
  createDeckHandler: (data: CreateDeckArgs) => void
} & Omit<ModalProps, 'children' | 'open'>

export const AddDeckModal = ({ createDeckHandler, ...props }: Props) => {
  const [open, setOpen] = useState(false)
  const [cover, setCover] = useState<File | null>(null)

  const { control, handleSubmit, reset } = useForm<FormValues>({
    resolver: zodResolver(addDeckSchema),
  })
  const submitHandler = handleSubmit(data => {
    createDeckHandler({ ...data, cover })
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
    container: clsx(s.container),
    input: clsx(s.input),
    inputTypeFileWrapper: clsx(s.inputTypeFileWrapper),
  }

  return (
    <div className={classNames.container}>
      <Button onClick={openModalHandler}>Add new Deck</Button>
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
            label={'deckImg'}
            setUploadImgHandler={setCover}
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
