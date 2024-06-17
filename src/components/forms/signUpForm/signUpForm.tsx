import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'

import { ROUTES } from '@/common/constants'
import { commonStyles } from '@/common/styles'
import { ControlledTextField } from '@/components/controlled'
import { Button, Card, Typography } from '@/components/ui'
import { SignUpArgs } from '@/pages/auth/api/authApi.types'
import { zodResolver } from '@hookform/resolvers/zod'
import clsx from 'clsx'
import { z } from 'zod'

import s from './signUpForm.module.scss'

const signInSchema = z
  .object({
    confirmPassword: z.string(),
    email: z.string().email('Invalid email address'),
    password: z.string().min(3),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  })

type FormValues = z.infer<typeof signInSchema>

type SignUpFormProps = {
  onSubmit: (data: SignUpArgs) => void
}
export const SignUpForm = ({ onSubmit }: SignUpFormProps) => {
  const { control, handleSubmit } = useForm<FormValues>({ resolver: zodResolver(signInSchema) })

  const submitHandler = handleSubmit(data => {
    onSubmit({ email: data.email, password: data.password })
  })

  const classNames = {
    card: clsx(s.card),
    confirmPassword: clsx(s.confirmPassword),
    container: clsx(commonStyles.cardContainer),
    email: clsx(s.email),
    hasAccount: clsx(s.hasAccount),
    password: clsx(s.password),
    signIn: clsx(s.signIn),
    submit: clsx(s.submit),
  }

  return (
    <div className={classNames.container}>
      <Card className={classNames.card} title={'Sign Up'}>
        <form onSubmit={submitHandler}>
          <ControlledTextField
            className={classNames.email}
            control={control}
            label={'Email'}
            name={'email'}
          />
          <ControlledTextField
            className={classNames.password}
            control={control}
            label={'Password'}
            name={'password'}
            type={'password'}
          />
          <ControlledTextField
            className={classNames.confirmPassword}
            control={control}
            label={'Confirm Password'}
            name={'confirmPassword'}
            type={'password'}
          />
          <Button className={classNames.submit} fullWidth type={'submit'}>
            Sign Up
          </Button>
          <Typography className={classNames.hasAccount} component={'div'} variant={'body2'}>
            Already have an account?
          </Typography>
          <Typography
            className={classNames.signIn}
            component={Link}
            to={ROUTES.signIn}
            variant={'subtitle1'}
          >
            Sign In
          </Typography>
        </form>
      </Card>
    </div>
  )
}
