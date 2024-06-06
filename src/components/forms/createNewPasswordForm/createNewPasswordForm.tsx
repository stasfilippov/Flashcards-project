import { useForm } from 'react-hook-form'

import { commonStyles } from '@/common/styles'
import { ControlledTextField } from '@/components/controlled/controlledTextField'
import { Typography } from '@/components/ui'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { zodResolver } from '@hookform/resolvers/zod'
import clsx from 'clsx'
import { z } from 'zod'

import s from './createNewPasswordForm.module.scss'

const createNewPasswordSchema = z.object({
  password: z.string().min(3),
})

type FormValues = z.infer<typeof createNewPasswordSchema>

export const CreateNewPasswordForm = () => {
  const { control, handleSubmit } = useForm<FormValues>({
    resolver: zodResolver(createNewPasswordSchema),
  })

  const submitHandler = handleSubmit(data => {
    console.log(data)
  })

  const classNames = {
    container: clsx(commonStyles.cardContainer, s.card),
    helperText: s.helperText,
    password: s.password,
  }

  return (
    <div className={classNames.container}>
      <Card title={'Create new password'}>
        <form onSubmit={submitHandler}>
          <ControlledTextField
            className={classNames.password}
            control={control}
            label={'Password'}
            name={'password'}
            type={'password'}
          />
          <Typography className={classNames.helperText} component={'div'} variant={'body2'}>
            Create new password and we will send you further instructions to email.
          </Typography>
          <Button fullWidth type={'submit'}>
            Create New Password
          </Button>
        </form>
      </Card>
    </div>
  )
}
