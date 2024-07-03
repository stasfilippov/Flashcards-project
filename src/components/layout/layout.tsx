import { ReactNode } from 'react'
import { Outlet, useOutletContext } from 'react-router-dom'

import { Header, HeaderProps } from '@/components/layout'
import { Spinner } from '@/components/ui'
import { useLogoutMutation, useMeQuery } from '@/pages/auth/api'

import s from './layout.module.scss'

type AuthContextType = { isAuthenticated: boolean }
export const Layout = () => {
  const { data, isError, isLoading } = useMeQuery()
  const [logout] = useLogoutMutation()

  const isAuthenticated = !isError && !isLoading

  if (isLoading) {
    return (
      <div className={s.loaderWrapper}>
        <Spinner />
      </div>
    )
  }

  return (
    <LayoutWrapper onLogout={logout} user={data}>
      <Outlet context={{ isAuthenticated } satisfies AuthContextType} />
    </LayoutWrapper>
  )
}

type LayoutWrapperProps = {
  children: ReactNode
} & HeaderProps
export const LayoutWrapper = ({ children, className, ...rest }: LayoutWrapperProps) => {
  return (
    <>
      <Header {...rest} />
      {children}
    </>
  )
}

// about useOutletContext https://reactrouter.com/en/main/hooks/use-outlet-context
export function useIsAuthenticated() {
  return useOutletContext<AuthContextType>()
}
