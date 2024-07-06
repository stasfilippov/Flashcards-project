import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

import { ROUTES } from '@/common/constants'
import { CreateNewPasswordForm } from '@/components/forms'
import { Page } from '@/components/layout'
import { router } from '@/router'

import { useCreatePasswordMutation } from '../auth/api/authApi'

export const CreatePasswordPage = () => {
  const { resetToken } = useParams()
  const [createPassword] = useCreatePasswordMutation()

  const submitHandler = (password: string) => {
    if (!resetToken) {
      return
    }
    createPassword({ password, resetToken })
      .unwrap()
      .then(() => {
        toast.success('The password has been successfully changed!')
      })
      .finally(() => router.navigate(ROUTES.signIn))
  }

  return (
    <Page>
      <CreateNewPasswordForm onSubmit={submitHandler} />
    </Page>
  )
}
