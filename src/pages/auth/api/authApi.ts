import {
  ForgotPasswordArgs,
  LoginArgs,
  LoginResponse,
  SignUpArgs,
  authMeResponse,
  signUpResponse,
  updateUserDataArgs,
  updateUserDataResponse,
} from '@/pages/auth/api/authApi.types'
import { flashcardsApi } from '@/services/flashcardApi'

const authApi = flashcardsApi.injectEndpoints({
  endpoints: builder => ({
    login: builder.mutation<LoginResponse, LoginArgs>({
      invalidatesTags: ['Auth'],
      async onQueryStarted(_, { queryFulfilled }) {
        const { data } = await queryFulfilled

        if (!data) {
          return
        }

        localStorage.setItem('accessToken', data.accessToken.trim())
        localStorage.setItem('refreshToken', data.refreshToken.trim())
      },
      query: body => ({
        body,
        method: 'POST',
        url: `/v1/auth/login`,
      }),
    }),
    logout: builder.mutation<void, void>({
      invalidatesTags: ['Auth'],
      onQueryStarted(_, { dispatch }) {
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')

        //-https://stackoverflow.com/questions/71573317/how-to-invalidate-rtk-query-cachesreset-state-globally
        dispatch(flashcardsApi.util.resetApiState())
      },
      query: _ => ({
        method: 'POST',
        url: `/v1/auth/logout`,
      }),
    }),
    me: builder.query<authMeResponse, void>({
      providesTags: ['Auth'],
      query: _ => ({
        method: 'GET',
        url: `/v1/auth/me`,
      }),
    }),
    recoverPassword: builder.mutation<void, ForgotPasswordArgs>({
      invalidatesTags: ['Auth'],
      query: args => ({
        body: args,
        method: 'POST',
        url: `/v1/auth/recover-password`,
      }),
    }),
    signUp: builder.mutation<signUpResponse, SignUpArgs>({
      query: args => ({
        body: args,
        method: 'POST',
        url: `/v1/auth/sign-up`,
      }),
    }),
    updateUserData: builder.mutation<updateUserDataResponse, updateUserDataArgs>({
      invalidatesTags: ['Auth'],
      query: args => ({
        body: args,
        method: 'PATCH',
        url: `/v1/auth/me`,
      }),
    }),
  }),
})

export const {
  useLoginMutation,
  useLogoutMutation,
  useMeQuery,
  useRecoverPasswordMutation,
  useSignUpMutation,
  useUpdateUserDataMutation,
} = authApi
