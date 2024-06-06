import { ChangeEvent, ComponentPropsWithoutRef, forwardRef, useId, useRef, useState } from 'react'

import { CloseOutline, EyeOffOutline, EyeOutline, SearchOutline } from '@/assets/icons/components'
import { mergeRefs } from '@/components/ui/textField/utils'
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

    const toggleShowPasswordHandler = () => setIsShowPassword(!isShowPassword)

    const generatedId = useId()
    const domainId = id ?? generatedId
    const domainType = type === 'password' && isShowPassword ? 'text' : type

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

    const classNames = {
      buttonShowPassword: clsx(s.showPasswordIcon, disabled && s.iconDisabled),
      fieldContainer: clsx(s.fieldContainer, className),
      input: clsx(
        s.field,
        !!errorMessage && s.error,
        isSearchField && s.hasSearchIcon,
        disabled && s.fieldDisabled,
        className
      ),
      searchIcon: clsx(s.searchIcon, isActive && s.searchIconActive, disabled && s.iconDisabled),
      typography: clsx(s.label),
      wrapper: clsx(s.wrapper, className),
    }

    return (
      <div className={classNames.wrapper} {...rest}>
        {label && (
          <Typography
            className={classNames.typography}
            component={'label'}
            htmlFor={domainId}
            variant={'body2'}
          >
            {label}
          </Typography>
        )}
        <div className={classNames.fieldContainer} {...rest}>
          {isSearchField && <SearchOutline className={classNames.searchIcon} width={20} />}
          <input
            className={classNames.input}
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
              className={classNames.buttonShowPassword}
              disabled={disabled}
              onClick={toggleShowPasswordHandler}
              type={'button'}
            >
              {isShowPassword ? <EyeOffOutline width={20} /> : <EyeOutline width={20} />}
            </button>
          )}
          {isSearchField && isActive && (
            <button className={s.clearInputIcon} onClick={clearHandler} type={'button'}>
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
