import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { ImageOutline } from '@/assets/icons/components'
import { ControlledCheckbox, ControlledTextField } from '@/components/controlled'
import { Button, Modal, ModalProps } from '@/components/ui'
import { CreateDeckArgs } from '@/pages/decksPage/api/decksApi.types'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import s from './addDeckModal.module.scss'

const addDeckSchema = z.object({
  isPrivate: z.boolean().default(false),
  name: z.string().min(3).max(30),
})

type FormValues = z.infer<typeof addDeckSchema>
type Props = {
  createDeckHandler: (formData: CreateDeckArgs) => void
} & Omit<ModalProps, 'children' | 'open'>

export const AddDeckModal = ({ createDeckHandler, ...props }: Props) => {
  const [open, setOpen] = useState(false)

  const { control, handleSubmit, reset } = useForm<FormValues>({
    resolver: zodResolver(addDeckSchema),
  })
  const submitHandler = handleSubmit(data => {
    createDeckHandler(data)
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
    <div className={s.container}>
      <Button onClick={openModalHandler}>Add new Deck</Button>
      <Modal onClose={closeModalHandler} open={open} title={'Add New Deck'} {...props}>
        <form onSubmit={submitHandler}>
          <ControlledTextField control={control} label={'Name Pack'} name={'name'} />
          <Button
            className={s.uploadBtn}
            fullWidth
            icon={<ImageOutline width={16} />}
            variant={'secondary'}
          >
            Upload Image
          </Button>
          <ControlledCheckbox control={control} label={'Private pack'} name={'isPrivate'} />
          <div className={s.buttonsContainer}>
            <Button onClick={closeModalHandler} variant={'secondary'}>
              Cancel
            </Button>
            <Button type={'submit'} variant={'primary'}>
              Add new Pack
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
