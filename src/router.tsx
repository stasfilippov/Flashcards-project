import {
  Navigate,
  Outlet,
  RouteObject,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom'

import { ROUTES } from '@/common/constants'
import { Layout, useIsAuthenticated } from '@/components/layout/layout'
import { CheckEmail, Error, SignInPage, SignUpPage } from '@/pages'
import { CardsPage } from '@/pages/cardsPage'
import { DecksPage } from '@/pages/decksPage'

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
