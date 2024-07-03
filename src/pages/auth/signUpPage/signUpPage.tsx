import { ROUTES } from '@/common/constants'
import { SignUpForm } from '@/components/forms'
import { Page, useIsAuthenticated } from '@/components/layout'
import { router } from '@/router'

import { SignUpArgs, useSignUpMutation } from '../api'

export const SignUpPage = () => {
  const [signUp, { error }] = useSignUpMutation()
  const { isAuthenticated } = useIsAuthenticated()

  const signUpHandler = async (data: SignUpArgs) => {
    await signUp(data).unwrap()
    await router.navigate(ROUTES.decks)

    //TODO - add error handler
    console.log(error)
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
