import { PersonalInformation } from '@/components/forms'
import { Page, User } from '@/components/layout'
import { ProgressBar } from '@/components/ui/progressBar/progressBar'
import { useMeQuery } from '@/pages/auth/api/authApi'

import { useUpdateUserMutation } from './api/profileApi'

export const Profile = () => {
  const { data, isLoading } = useMeQuery()
  const [updateUser] = useUpdateUserMutation()

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
