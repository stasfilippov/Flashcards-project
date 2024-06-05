import { ChangeEvent, ComponentPropsWithoutRef, forwardRef, useId, useRef, useState } from 'react'

import { CloseOutline, EyeOffOutline, EyeOutline, SearchOutline } from '@/assets/icons/components'
import { getType } from '@/components/ui/textField/utils/getTypes'
import { mergeRefs } from '@/components/ui/textField/utils/merge-refs'
import { Typography } from '@/components/ui/typography'
import clsx from 'clsx'

import s from './textField.module.scss'

export type TextFieldProps = {
  className?: string
  errorMessage?: string
  inputChangeHandler?: (value: string) => void
  label?: string
  placeholder?: string
} & ComponentPropsWithoutRef<'input'>

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  (
    {
      className,
      disabled,
      errorMessage,
      id,
      inputChangeHandler,
      label,
      onChange,
      placeholder,
      type = 'text',
      value,
      ...rest
    },
    forwardedRef
  ) => {
    const [isShowPassword, setIsShowPassword] = useState(false)
    const [isActive, setIsActive] = useState(false)
    const internalRef = useRef<HTMLInputElement>(null)
    const finalRef = mergeRefs([forwardedRef, internalRef])
    const isSearchField = type === 'search'
    const isPasswordField = type === 'password'

    const toggleShowPasswordHandler = () => setIsShowPassword(prevState => !prevState)

    const generatedId = useId()
    const domainId = id ?? generatedId
    const domainType = getType(type, isShowPassword)

    const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
      inputChangeHandler?.(e.target.value)
    }
    const clearHandler = () => {
      if (internalRef.current) {
        internalRef.current.value = ''
      }
    }
    const focusHandler = () => {
      setIsActive(true)
    }
    const blurHandler = () => {
      setIsActive(false)
    }

    return (
      <div className={clsx(s.wrapper, className)} {...rest}>
        {label && (
          <Typography
            className={clsx(s.label)}
            component={'label'}
            htmlFor={domainId}
            variant={'body2'}
          >
            {label}
          </Typography>
        )}
        <div className={clsx(s.fieldContainer, className)} {...rest}>
          {isSearchField && (
            <SearchOutline
              className={clsx(
                s.searchIcon,
                isActive && s.searchIconActive,
                disabled && s.iconDisabled
              )}
              width={20}
            />
          )}
          <input
            className={clsx(
              s.field,
              !!errorMessage && s.error,
              isSearchField && s.hasSearchIcon,
              disabled && s.fieldDisabled,
              className
            )}
            disabled={disabled}
            id={domainId}
            onBlur={blurHandler}
            onChange={changeHandler}
            onFocus={focusHandler}
            placeholder={placeholder}
            ref={finalRef}
            type={domainType}
            value={value}
            {...rest}
          />
          {isPasswordField && (
            <button
              className={clsx(s.showPasswordIcon, disabled && s.iconDisabled)}
              disabled={disabled}
              onClick={toggleShowPasswordHandler}
            >
              {isShowPassword ? <EyeOffOutline width={20} /> : <EyeOutline width={20} />}
            </button>
          )}
          {isSearchField && isActive && (
            <button className={s.clearInputIcon} onClick={clearHandler}>
              <CloseOutline height={16} width={16} />
            </button>
          )}
        </div>
        <Typography className={clsx(s.error)} variant={'caption'}>
          {errorMessage}
        </Typography>
      </div>
    )
  }
)
