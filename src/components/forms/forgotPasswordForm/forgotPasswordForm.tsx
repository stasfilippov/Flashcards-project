import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'

import { ROUTES } from '@/common/constants'
import { commonStyles } from '@/common/styles'
import { ControlledTextField } from '@/components/controlled'
import { Button, Card, Typography } from '@/components/ui'
import { zodResolver } from '@hookform/resolvers/zod'
import clsx from 'clsx'
import { z } from 'zod'

import s from './forgotPasswordForm.module.scss'

const forgotPasswordSchema = z.object({
  email: z.string().email(),
})

type FormValues = z.infer<typeof forgotPasswordSchema>
type Props = {
  onSubmit: (email: string) => void
}
export const ForgotPasswordForm = ({ onSubmit }: Props) => {
  const { control, handleSubmit } = useForm<FormValues>({
    resolver: zodResolver(forgotPasswordSchema),
  })
  const submitHandler = handleSubmit(data => {
    onSubmit(data.email)
  })

  return (
    <div className={clsx(commonStyles.cardContainer, s.container)}>
      <Card title={'Forgot your password?'}>
        <form onSubmit={submitHandler}>
          <ControlledTextField
            className={s.input}
            control={control}
            label={'Email'}
            name={'email'}
          />
          <Typography className={s.formInfo} variant={'body2'}>
            Enter your email address and we will send you further instructions
          </Typography>
          <Button className={s.submitBtn} fullWidth type={'submit'}>
            Send Instructions
          </Button>
        </form>
        <Typography className={s.questionText} variant={'body2'}>
          Did you remember your password?
        </Typography>
        <Typography className={s.link} component={Link} to={ROUTES.signIn} variant={'subtitle1'}>
          Try logging in
        </Typography>
      </Card>
    </div>
  )
}
