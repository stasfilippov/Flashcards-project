import { PersonalInformation } from '@/components/forms'
import { Page, User } from '@/components/layout'
import { ProgressBar } from '@/components/ui/progressBar/progressBar'
import { useMeQuery } from '@/pages/auth/api/authApi'

export const Profile = () => {
  const { data, isError, isLoading } = useMeQuery()

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
        <PersonalInformation onSubmit={() => {}} user={user} />
      </Page>
    )
  }
}
