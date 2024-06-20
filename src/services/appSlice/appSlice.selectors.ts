import { RootState } from '@/services'

export const appStatusSelector = (state: RootState) => state.app.appStatus
