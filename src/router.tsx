import {
  Navigate,
  Outlet,
  RouteObject,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom'

import { ROUTES } from '@/common/constants'
import { ForgotPasswordForm, PersonalInformation, SignInForm, SignUpForm } from '@/components/forms'

const publicRoutes: RouteObject[] = [
  {
    element: <SignInForm onSubmit={() => {}} />,
    path: ROUTES.signIn,
  },
  {
    element: <SignUpForm />,
    path: ROUTES.signUp,
  },
  {
    element: <ForgotPasswordForm onSubmit={() => {}} />,
    path: ROUTES.forgotPassword,
  },
  {
    element: <PersonalInformation onSubmit={() => {}} user={{ email: '', name: '' }} />,
  },
]

const privateRoutes: RouteObject[] = [
  {
    element: <div>hello</div>,
    path: '/',
  },
]

const router = createBrowserRouter([
  {
    children: privateRoutes,
    element: <PrivateRoutes />,
  },
  ...publicRoutes,
])

function PrivateRoutes() {
  const isAuthenticated = false

  return isAuthenticated ? <Outlet /> : <Navigate to={ROUTES.signIn} />
}

export function Router() {
  return <RouterProvider router={router} />
}
