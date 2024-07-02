import { toast } from 'react-toastify'

import { isErrorWithMessage, isFetchBaseQueryError } from '@/services/helpers/helpers'
import { Middleware, isRejected } from '@reduxjs/toolkit'

/**
 * Log a warning and show a toast!
 */
export const rtkErrorLogger: Middleware = () => next => action => {
  if (isRejected(action)) {
    let errorMessage = 'Unknown Error occurred.'

    if (isFetchBaseQueryError(action.payload)) {
      console.log(action.payload)
      if ('error' in action.payload && typeof action.payload.error === 'string') {
        errorMessage = action.payload.error
      } else if (
        'data' in action.payload &&
        typeof action.payload.data === 'object' &&
        action.payload.data != null
      ) {
        if ('path' in action.payload.data && typeof action.payload.data.path === 'string') {
          if (action.payload.data.path === '/v1/auth/me') {
            return next(action)
          }
        }

        if (
          'errorMessages' in action.payload.data &&
          Array.isArray(action.payload.data.errorMessages) &&
          typeof action.payload.data.errorMessages[0] === 'string'
        ) {
          errorMessage = action.payload.data.errorMessages[0]
        }

        if ('message' in action.payload.data && typeof action.payload.data.message === 'string') {
          errorMessage = action.payload.data.message
        }
      }
    } else if (isErrorWithMessage(action.payload)) {
      errorMessage = action.payload.message
    }

    toast.error(errorMessage)
  }

  return next(action)
}
