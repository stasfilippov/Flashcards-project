import { toast } from 'react-toastify'

import { ROUTES } from '@/common/constants'
import { emailConfirmTemplate } from '@/common/htmlTemplates/emailConfirmTemplate'
import { SignUpForm } from '@/components/forms'
import { Page, useIsAuthenticated } from '@/components/layout'
import { router } from '@/router'

import { SignUpArgs, useLoginMutation, useSignUpMutation } from '../api'

export const SignUpPage = () => {
  const [signUp] = useSignUpMutation()
  const [login] = useLoginMutation()
  const { isAuthenticated } = useIsAuthenticated()

  const signUpHandler = (data: SignUpArgs) => {
    signUp({ ...data, ...emailConfirmTemplate, sendConfirmationEmail: true })
      .unwrap()
      .then(async () => {
        await login({ email: data.email, password: data.password, rememberMe: false })
        toast.success('You have successfully registered!')
        router.navigate(ROUTES.decks)
      })
  }

  if (isAuthenticated) {
    router.navigate(ROUTES.decks)
  }

  return (
    <Page>
      <SignUpForm onSubmit={signUpHandler} />
    </Page>
  )
}
