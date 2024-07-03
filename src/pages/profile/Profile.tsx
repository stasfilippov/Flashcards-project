import { PersonalInformation } from '@/components/forms'
import { Page, User } from '@/components/layout'
import { ProgressBar } from '@/components/ui'
import { useMeQuery } from '@/pages/auth/api'

import { useUpdateUserMutation } from './api/profileApi'

export const Profile = () => {
  const { data, isError, isLoading } = useMeQuery()
  const [updateUser] = useUpdateUserMutation()

  if (isError) {
    // TODO error handling
    return <div>error handling here</div>
  }

  if (isLoading) {
    return <ProgressBar />
  }

  if (data) {
    const user: User = {
      avatar: data?.avatar,
      email: data?.email,
      name: data?.name,
    }

    return (
      <Page>
        <PersonalInformation onSubmit={updateUser} user={user} />
      </Page>
    )
  }
}
