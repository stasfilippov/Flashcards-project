import { useNavigate } from 'react-router-dom'

import { ROUTES } from '@/common/constants'
import { SignUpForm } from '@/components/forms'
import { Page } from '@/components/layout'
import { useSignUpMutation } from '@/pages/auth/api/authApi'
import { SignUpArgs } from '@/pages/auth/api/authApi.types'

export const SignUpPage = () => {
  const [signUp] = useSignUpMutation()
  const navigate = useNavigate()

  const signUpHandler = (data: SignUpArgs) => {
    signUp(data)
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
      <SignUpForm onSubmit={signUpHandler} />
    </Page>
  )
}
