import { ROUTES } from '@/common/constants'
import { recoverPasswordTemplate } from '@/common/htmlTemplates'
import { ForgotPasswordForm } from '@/components/forms'
import { Page, useIsAuthenticated } from '@/components/layout'
import { router } from '@/router'

import { useRecoverPasswordMutation } from '../api'

export const ForgotPasswordPage = () => {
  const [recoverPassword] = useRecoverPasswordMutation()
  const { isAuthenticated } = useIsAuthenticated()

  const submitHandler = async (email: string) => {
    await recoverPassword({
      email,
      ...recoverPasswordTemplate,
    }).unwrap()
    await router.navigate(ROUTES.checkEmail)
  }

  if (isAuthenticated) {
    router.navigate(ROUTES.decks)
  }

  return (
    <Page>
      <ForgotPasswordForm onSubmit={submitHandler} />
    </Page>
  )
}
