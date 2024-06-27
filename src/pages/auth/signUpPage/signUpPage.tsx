import { ROUTES } from '@/common/constants'
import { SignUpForm } from '@/components/forms'
import { Page } from '@/components/layout'
import { useIsAuthenticated } from '@/components/layout/layout'
import { useSignUpMutation } from '@/pages/auth/api/authApi'
import { SignUpArgs } from '@/pages/auth/api/authApi.types'
import { router } from '@/router'

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
