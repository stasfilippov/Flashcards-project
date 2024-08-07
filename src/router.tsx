import {
  Navigate,
  Outlet,
  RouteObject,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom'

import { ROUTES } from '@/common/constants'
import { Layout, useIsAuthenticated } from '@/components/layout'
import {
  CardsPage,
  CheckEmail,
  CreatePasswordPage,
  DecksPage,
  Error,
  ForgotPasswordPage,
  LearnPage,
  Profile,
  SignInPage,
  SignUpPage,
} from '@/pages'
import { ConfirmEmailPage } from '@/pages/auth/confirmEmail/confirmEmail'

const publicRoutes: RouteObject[] = [
  {
    element: <SignUpPage />,
    path: ROUTES.signUp,
  },
  {
    element: <SignInPage />,
    path: ROUTES.signIn,
  },
  {
    element: <ForgotPasswordPage />,
    path: ROUTES.forgotPassword,
  },
  {
    element: <CheckEmail />,
    path: ROUTES.checkEmail,
  },
  {
    element: <CreatePasswordPage />,
    path: `${ROUTES.createNewPassword}/:resetToken`,
  },
  {
    element: <ConfirmEmailPage />,
    path: `${ROUTES.confirmEmail}/:verificationToken`,
  },
  {
    element: <Error />,
    path: ROUTES.other,
  },
]

const privateRoutes: RouteObject[] = [
  {
    element: <Navigate to={ROUTES.decks} />,
    path: ROUTES.base,
  },
  {
    element: <DecksPage />,
    path: ROUTES.decks,
  },
  {
    element: <CardsPage />,
    path: `${ROUTES.decks}/:deckId`,
  },
  {
    element: <LearnPage />,
    path: `${ROUTES.decks}/:deckId${ROUTES.learn}`,
  },
  {
    element: <Profile />,
    path: ROUTES.profile,
  },
]

export const router = createBrowserRouter([
  {
    children: [
      {
        children: privateRoutes,
        element: <PrivateRoutes />,
      },
      ...publicRoutes,
    ],
    element: <Layout />,
    path: ROUTES.base,
  },
])

function PrivateRoutes() {
  const { isAuthenticated } = useIsAuthenticated()

  return isAuthenticated ? <Outlet /> : <Navigate to={ROUTES.signIn} />
}

export function Router() {
  return <RouterProvider router={router} />
}
