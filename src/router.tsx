import {
  Navigate,
  Outlet,
  RouteObject,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom'

import { ROUTES } from '@/common/constants'
import { DecksPage } from '@/pages/DecksPage'

const publicRoutes: RouteObject[] = [
  {
    element: <div>login</div>,
    path: ROUTES.signIn,
  },
]

const privateRoutes: RouteObject[] = [
  {
    element: <DecksPage />,
    path: ROUTES.base,
  },
]

function PrivateRoutes() {
  const isAuthenticated = true

  return isAuthenticated ? <Outlet /> : <Navigate to={ROUTES.signIn} />
}

const router = createBrowserRouter([
  {
    children: privateRoutes,
    element: <PrivateRoutes />,
  },
  ...publicRoutes,
])

export function Router() {
  return <RouterProvider router={router} />
}
