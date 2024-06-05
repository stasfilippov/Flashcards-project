import { ComponentProps } from 'react'

export const getType = (
  type: ComponentProps<'input'>['type'],
  isShowPassword: boolean
): ComponentProps<'input'>['type'] => {
  if (type === 'password' && isShowPassword) {
    return 'text'
  }

  return type
}
