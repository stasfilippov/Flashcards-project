import { useForm } from 'react-hook-form'

import { ControlledTextField } from '@/components/controlled'
import { Button } from '@/components/ui'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import s from './personalInformation.module.scss'

const changeNicknameSchema = z.object({
  nickname: z.string().min(3).max(30),
})

export type NicknameFormValues = z.infer<typeof changeNicknameSchema>
type Props = {
  closeEditMode: () => void
  onSubmit: (args: NicknameFormValues) => void
}
export const ChangeNicknameForm = ({ closeEditMode, onSubmit }: Props) => {
  const { control, handleSubmit } = useForm<NicknameFormValues>({
    resolver: zodResolver(changeNicknameSchema),
  })
  const submitFormHandler = handleSubmit(data => {
    onSubmit(data)
    closeEditMode()
  })

  return (
    <form className={s.form} onSubmit={submitFormHandler}>
      <ControlledTextField
        className={s.input}
        control={control}
        label={'Nickname'}
        name={'nickname'}
      />
      <Button className={s.saveBtn} fullWidth type={'submit'}>
        Save Changes
      </Button>
    </form>
  )
}
