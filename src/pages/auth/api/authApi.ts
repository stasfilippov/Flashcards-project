import { ROUTES } from '@/common/constants'
import { router } from '@/router'
import { flashcardsApi } from '@/services/flashcardApi'

import {
  AuthMeResponse,
  CreatePasswordArgs,
  ForgotPasswordArgs,
  LoginArgs,
  LoginResponse,
  SignUpArgs,
  SignUpResponse,
  UpdateUserDataArgs,
  UpdateUserDataResponse,
  VerifyEmailArgs,
} from './'

const authApi = flashcardsApi.injectEndpoints({
  endpoints: builder => ({
    createPassword: builder.mutation<void, CreatePasswordArgs>({
      query: ({ resetToken, ...body }) => ({
        body,
        method: 'POST',
        url: `/v1/auth/reset-password/${resetToken}`,
      }),
    }),
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
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        await queryFulfilled
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
        //-https://stackoverflow.com/questions/71573317/how-to-invalidate-rtk-query-cachesreset-state-globally
        dispatch(flashcardsApi.util.resetApiState())
        router.navigate(ROUTES.signIn)
      },
      query: _ => ({
        method: 'POST',
        url: `/v2/auth/logout`,
      }),
    }),
    me: builder.query<AuthMeResponse, void>({
      providesTags: ['Auth'],
      query: _ => ({
        method: 'GET',
        url: `/v1/auth/me`,
      }),
    }),
    recoverPassword: builder.mutation<void, ForgotPasswordArgs>({
      query: args => ({
        body: args,
        method: 'POST',
        url: `/v1/auth/recover-password`,
      }),
    }),
    signUp: builder.mutation<SignUpResponse, SignUpArgs>({
      query: args => ({
        body: args,
        method: 'POST',
        url: `/v1/auth/sign-up`,
      }),
    }),
    updateUserData: builder.mutation<UpdateUserDataResponse, UpdateUserDataArgs>({
      invalidatesTags: ['Auth'],
      query: args => ({
        body: args,
        method: 'PATCH',
        url: `/v1/auth/me`,
      }),
    }),
    verifyEmail: builder.mutation<void, VerifyEmailArgs>({
      query: body => ({
        body,
        method: 'POST',
        url: '/v1/auth/verify-email',
      }),
    }),
  }),
})

export const {
  useCreatePasswordMutation,
  useLoginMutation,
  useLogoutMutation,
  useMeQuery,
  useRecoverPasswordMutation,
  useSignUpMutation,
  useUpdateUserDataMutation,
  useVerifyEmailMutation,
} = authApi
