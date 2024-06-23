export type authMeResponse = UserData
export type updateUserDataResponse = UserData
export type signUpResponse = UserData

export type updateUserDataArgs = {
  avatar: string
  name: string
}

export type UserData = {
  avatar: string
  created: string
  email: string
  id: string
  isEmailVerified: boolean
  name: string
  updated: string
}

export type LoginArgs = {
  email: string
  password: string
  rememberMe: boolean
}

export type LoginResponse = {
  accessToken: string
  refreshToken: string
}

export type SignUpArgs = {
  email: string
  name?: string
  password: string
  sendConfirmationEmail?: boolean
  subject?: string
}

export type ForgotPasswordArgs = {
  email: string
  html?: string
  subject?: string
}
