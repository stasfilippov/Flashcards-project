import { ROUTES } from '@/common/constants'
import { SignInForm } from '@/components/forms'
import { Page, useIsAuthenticated } from '@/components/layout'
import { router } from '@/router'

import { LoginArgs, useLoginMutation } from '../api'

export const SignInPage = () => {
  const [signIn, { error }] = useLoginMutation()
  const { isAuthenticated } = useIsAuthenticated()

  const signInHandler = async (data: LoginArgs) => {
    await signIn(data).unwrap()
    await router.navigate(ROUTES.decks)

    //TODO - add error handler
    console.log(error)
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
