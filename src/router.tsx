import {
  Navigate,
  Outlet,
  RouteObject,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom'

import { ROUTES } from '@/common/constants'
import { Layout, useIsAuthenticated } from '@/components/layout/layout'
import { CheckEmail, Error } from '@/pages'
import { CardsPage } from '@/pages/cardsPage'
import { DecksPage } from '@/pages/decksPage'
import { SignUpPage } from '@/pages/signUpPage/signUpPage'

const publicRoutes: RouteObject[] = [
  {
    element: <div>Sign in</div>,
    path: ROUTES.signIn,
  },
  {
    element: <SignUpPage />,
    path: ROUTES.signUp,
  },
  {
    element: <div>Forgot Password</div>,
    path: ROUTES.forgotPassword,
  },
  {
    element: <CheckEmail />,
    path: ROUTES.checkEmail,
  },
  {
    element: <div>Create New Password</div>,
    path: ROUTES.createNewPassword,
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
    element: <div>Learn</div>,
    path: `${ROUTES.decks}/:deckId${ROUTES.learn}`,
  },
  {
    element: <div>Profile</div>,
    path: ROUTES.profile,
  },
]

const router = createBrowserRouter([
  {
    children: [
      {
        children: privateRoutes,
        element: <PrivateRoutes />,
      },
      ...publicRoutes,
    ],
    element: <Layout />,
  },
])

function PrivateRoutes() {
  const { isAuthenticated } = useIsAuthenticated()

  return isAuthenticated ? <Outlet /> : <Navigate to={ROUTES.signIn} />
}

export function Router() {
  return <RouterProvider router={router} />
}
