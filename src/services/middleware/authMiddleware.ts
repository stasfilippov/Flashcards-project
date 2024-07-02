import { toast } from 'react-toastify'

import { isErrorWithMessage, isFetchBaseQueryError } from '@/services/helpers/helpers'
import { Middleware, MiddlewareAPI, isRejected } from '@reduxjs/toolkit'

/**
 * Log a warning and show a toast!
 */
export const rtkErrorLogger: Middleware = (api: MiddlewareAPI) => next => action => {
  if (isRejected(action)) {
    let errorMessage = 'Unkown Error accourred.'

    if (isFetchBaseQueryError(action.payload)) {
      if ('error' in action.payload && typeof action.payload.error === 'string') {
        errorMessage = action.payload.error
      } else if (
        'data' in action.payload &&
        typeof action.payload.data === 'object' &&
        action.payload.data != null &&
        'message' in action.payload.data &&
        typeof action.payload.data.message === 'string'
      ) {
        errorMessage = action.payload.data.message
      }
    } else if (isErrorWithMessage(action.payload)) {
      errorMessage = action.payload.message
    }

    toast.error(errorMessage)
  }

  return next(action)
}
