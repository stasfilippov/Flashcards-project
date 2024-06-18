import { ReactNode } from 'react'
import { Outlet, useOutletContext } from 'react-router-dom'

import { Header, HeaderProps } from '@/components/layout/header'
import { useMeQuery } from '@/pages/auth/api/authApi'

type AuthContextType = { isAuthenticated: boolean }
export const Layout = () => {
  const { data, isError, isLoading } = useMeQuery()

  const isAuthenticated = !isError && !isLoading

  if (isLoading) {
    return <h1>Loading</h1>
  }

  return (
    <LayoutWrapper onLogout={() => {}} user={data}>
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
