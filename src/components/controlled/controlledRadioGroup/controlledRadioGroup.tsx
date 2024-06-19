import { FieldValues, UseControllerProps, useController } from 'react-hook-form'

import { RadioGroup, RadioProps } from '@/components/ui'

export type ControlledRadioProps<T extends FieldValues> = Omit<
  RadioProps,
  'disabled' | 'name' | 'onValueChange' | 'ref' | 'value'
> &
  UseControllerProps<T>

export const ControlledRadioGroup = <T extends FieldValues>({
  control,
  defaultValue,
  disabled,
  name,
  rules,
  shouldUnregister,
  ...rest
}: ControlledRadioProps<T>) => {
  const {
    field: { onChange, ...field },
    fieldState: { error },
  } = useController({
    control,
    defaultValue,
    disabled,
    name,
    rules,
    shouldUnregister,
  })

  return <RadioGroup error={error?.message} {...rest} {...field} onValueChange={onChange} />
}
