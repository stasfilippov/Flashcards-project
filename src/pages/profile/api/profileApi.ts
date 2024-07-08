import { UserData } from '@/pages/auth/api'
import { flashcardsApi } from '@/services/flashcardApi'

import { UpdateProfileArgs } from './profileApi.types'

const profileApi = flashcardsApi.injectEndpoints({
  endpoints: builder => ({
    updateUser: builder.mutation<UserData, UpdateProfileArgs>({
      invalidatesTags: ['Auth'],
      query: ({ avatar, name }) => {
        const formData = new FormData()

        if (name) {
          formData.append('name', name)
        }

        if (avatar) {
          formData.append('avatar', avatar)
        } else if (avatar === null) {
          formData.append('avatar', '')
        }

        return {
          body: formData,
          method: 'PATCH',
          url: `/v1/auth/me`,
        }
      },
    }),
  }),
})

export const { useUpdateUserMutation } = profileApi
