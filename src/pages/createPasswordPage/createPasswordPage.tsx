import { useParams } from 'react-router-dom'

import { ROUTES } from '@/common/constants'
import { CreateNewPasswordForm } from '@/components/forms'
import { Page } from '@/components/layout'
import { router } from '@/router'

import { useCreatePasswordMutation } from '../auth/api/authApi'

export const CreatePasswordPage = () => {
  const { resetToken } = useParams()
  const [createPassword, { error }] = useCreatePasswordMutation()

  const submitHandler = async (password: string) => {
    if (!resetToken) {
      return
    }
    await createPassword({ password, resetToken }).unwrap()
    await router.navigate(ROUTES.signIn)

    //TODO - add error handler
    console.log(error)
  }

  return (
    <Page>
      <CreateNewPasswordForm onSubmit={submitHandler} />
    </Page>
  )
}
