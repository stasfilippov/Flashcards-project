import { toast } from 'react-toastify'

import { ROUTES } from '@/common/constants'
import { SignUpForm } from '@/components/forms'
import { Page } from '@/components/layout'
import { useIsAuthenticated } from '@/components/layout/layout'
import { useLoginMutation, useSignUpMutation } from '@/pages/auth/api/authApi'
import { SignUpArgs } from '@/pages/auth/api/authApi.types'
import { router } from '@/router'

export const SignUpPage = () => {
  const [signUp] = useSignUpMutation()
  const [login] = useLoginMutation()
  const { isAuthenticated } = useIsAuthenticated()

  const signUpHandler = (data: SignUpArgs) => {
    signUp(data)
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
