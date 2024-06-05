import { FieldValues, UseControllerProps, useController } from 'react-hook-form'

import { Checkbox, CheckboxProps } from '@/components/ui/checkbox'

type Props<T extends FieldValues> = { label?: string } & Omit<
  CheckboxProps,
  'checked' | 'label' | 'onBlur' | 'onCheckedChange'
> &
  UseControllerProps<T>

export const ControlledCheckbox = <T extends FieldValues>({
  control,
  disabled,
  name,
  shouldUnregister,
  ...rest
}: Props<T>) => {
  const {
    field: { onBlur, onChange, ref, value },
  } = useController({
    control,
    disabled,
    name,
    shouldUnregister,
  })

  return (
    <Checkbox
      checked={!!value}
      disabled={disabled}
      onCheckedChange={onChange}
      ref={ref}
      {...rest}
      onBlur={onBlur}
    />
  )
}
