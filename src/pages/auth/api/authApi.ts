import {
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
      query: args => ({
        body: args,
        method: 'POST',
        url: `/v1/auth/login`,
      }),
    }),
    me: builder.query<authMeResponse, void>({
      providesTags: ['Auth'],
      query: _ => ({
        method: 'GET',
        url: `/v1/auth/me`,
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

export const { useLoginMutation, useMeQuery, useUpdateUserDataMutation } = authApi
