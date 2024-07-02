import { toast } from 'react-toastify'

import { ROUTES } from '@/common/constants'
import { SignInForm } from '@/components/forms'
import { Page } from '@/components/layout'
import { useLoginMutation } from '@/pages/auth/api/authApi'
import { LoginArgs } from '@/pages/auth/api/authApi.types'
import { router } from '@/router'

export const SignInPage = () => {
  const [signIn] = useLoginMutation()

  const signInHandler = (data: LoginArgs) => {
    signIn(data)
      .unwrap()
      .then(() => {
        toast.success('You have successfully logged in!')
        router.navigate(ROUTES.decks)
      })
  }

  return (
    <Page>
      <SignInForm onSubmit={signInHandler} />
    </Page>
  )
}
