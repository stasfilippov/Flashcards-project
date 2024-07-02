export type AuthMeResponse = UserData
export type UpdateUserDataResponse = UserData
export type SignUpResponse = UserData

export type UpdateUserDataArgs = {
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
export type CreatePasswordArgs = {
  password: string
  resetToken: string
}
