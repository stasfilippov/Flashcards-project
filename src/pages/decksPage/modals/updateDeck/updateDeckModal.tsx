import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

import { Edit2Outline, ImageOutline } from '@/assets/icons/components'
import { ControlledCheckbox, ControlledTextField } from '@/components/controlled'
import { Button, Modal, ModalProps } from '@/components/ui'
import { useUpdateDeckMutation } from '@/pages/decksPage/api/decksApi'
import { UpdateDeckArgs } from '@/pages/decksPage/api/decksApi.types'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import s from './updateDeckModal.module.scss'

const updateDeckSchema = z.object({
  isPrivate: z.boolean().default(false),
  name: z.string().min(3).max(30).optional(),
})

type FormValues = z.infer<typeof updateDeckSchema>
type Props = {
  id: string
  initialValues?: Omit<UpdateDeckArgs, 'id'>
} & Omit<ModalProps, 'children' | 'open'>

export const UpdateDeckModal = ({ id, initialValues = {}, ...props }: Props) => {
  const [open, setOpen] = useState(false)
  const [updateDeck] = useUpdateDeckMutation()
  const { control, handleSubmit, reset } = useForm<FormValues>({
    defaultValues: initialValues,
    resolver: zodResolver(updateDeckSchema),
  })

  useEffect(() => {
    open && reset(initialValues)
  }, [open, initialValues, reset])

  const submitHandler = handleSubmit(async data => {
    try {
      await updateDeck({ id, ...data })
      reset()
      setOpen(false)
    } catch (error) {
      console.log(error)
    }
  })

  const openModalHandler = () => {
    setOpen(true)
  }
  const closeModalHandler = () => {
    reset()
    setOpen(false)
  }

  return (
    <>
      <button onClick={openModalHandler}>
        <Edit2Outline width={16} />
      </button>
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
              Update Deck
            </Button>
          </div>
        </form>
      </Modal>
    </>
  )
}
