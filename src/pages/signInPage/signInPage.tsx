import { useNavigate } from 'react-router-dom'

import { ROUTES } from '@/common/constants'
import { SignInForm } from '@/components/forms'
import { Page } from '@/components/layout'
import { useLoginMutation } from '@/pages/auth/api/authApi'
import { LoginArgs } from '@/pages/auth/api/authApi.types'

export const SignInPage = () => {
  const [signIn] = useLoginMutation()
  const navigate = useNavigate()

  const signInHandler = (args: LoginArgs) => {
    signIn(args)
      .unwrap()
      .then(() => {
        navigate(ROUTES.base)
      })
      .catch((error: any) => {
        console.log(error.messages)
      })
  }

  return (
    <Page>
      <SignInForm onSubmit={signInHandler} />
    </Page>
  )
}
