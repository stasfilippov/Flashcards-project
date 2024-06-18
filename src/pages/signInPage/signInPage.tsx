import { ROUTES } from '@/common/constants'
import { SignInForm } from '@/components/forms'
import { Page } from '@/components/layout'
import { useIsAuthenticated } from '@/components/layout/layout'
import { useLoginMutation } from '@/pages/auth/api/authApi'
import { LoginArgs } from '@/pages/auth/api/authApi.types'
import { router } from '@/router'

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
