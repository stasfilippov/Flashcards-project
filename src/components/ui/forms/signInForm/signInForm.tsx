import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'

import { ROUTES } from '@/common/constants'
import { commonStyles } from '@/common/styles'
import { ControlledCheckbox, ControlledTextField } from '@/components/controlled'
import { Typography } from '@/components/ui'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { zodResolver } from '@hookform/resolvers/zod'
import clsx from 'clsx'
import { z } from 'zod'

import s from './signInForm.module.scss'

const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(3),
  rememberMe: z.boolean().default(false),
})

type FormValues = z.infer<typeof signInSchema>

export const SignInForm = () => {
  const { control, handleSubmit } = useForm<FormValues>({
    resolver: zodResolver(signInSchema),
  })
  const submitHandler = handleSubmit(data => {
    console.log(data)
  })

  const classNames = {
    container: clsx(commonStyles.cardContainer, s.container),
    forgotPasswordLink: s.forgotPasswordLink,
    input: s.input,
    noAccountText: s.noAccountText,
    signUpLink: s.signUpLink,
    submit: s.submit,
  }

  return (
    <div className={classNames.container}>
      <Card title={'Sign In'}>
        <form className={s.form} onSubmit={submitHandler}>
          <ControlledTextField
            className={classNames.input}
            control={control}
            label={'Email'}
            name={'email'}
          />
          <ControlledTextField
            className={classNames.input}
            control={control}
            label={'Password'}
            name={'password'}
            type={'password'}
          />
          <ControlledCheckbox control={control} label={'Remember me'} name={'rememberMe'} />
          <Typography
            className={classNames.forgotPasswordLink}
            component={Link}
            to={ROUTES.forgotPassword}
            variant={'body2'}
          >
            Forgot Password?
          </Typography>
          <Button className={classNames.submit} fullWidth type={'submit'}>
            Sign In
          </Button>
        </form>
        <Typography className={classNames.noAccountText} component={'div'} variant={'body2'}>
          Don&lsquo;t have an account?
        </Typography>
        <Typography
          className={classNames.signUpLink}
          component={Link}
          to={ROUTES.signUp}
          variant={'subtitle1'}
        >
          Sign Up
        </Typography>
      </Card>
    </div>
  )
}
