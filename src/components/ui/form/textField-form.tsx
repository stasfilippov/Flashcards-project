import { useController } from 'react-hook-form'

import { TextField } from '@/components/ui/textField'

export const TextFieldForm = ({ control, name }: any) => {
  const {
    field: { onChange, value, ...field },
  } = useController({ control, name })

  return (
    <TextField
      label={'Password'}
      onChangeCallback={onChange}
      placeholder={'Password'}
      type={name}
      {...field}
    />
  )
}
