import { toast } from 'react-toastify'

import { ROUTES } from '@/common/constants'
import { SignInForm } from '@/components/forms'
import { Page, useIsAuthenticated } from '@/components/layout'
import { router } from '@/router'

import { LoginArgs, useLoginMutation } from '../api'

export const SignInPage = () => {
  const [signIn] = useLoginMutation()
  const { isAuthenticated } = useIsAuthenticated()

  const signInHandler = (data: LoginArgs) => {
    signIn(data)
      .unwrap()
      .then(() => {
        toast.success('You have successfully logged in!')
        router.navigate(ROUTES.decks)
      })
  }

  if (isAuthenticated) {
    router.navigate(ROUTES.decks)
  }

  return (
    <Page>
      <SignInForm onSubmit={signInHandler} />
    </Page>
  )
}
