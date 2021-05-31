import { AppStateType } from './../reduxStore'

export const showModeIncomeSelector = (state: AppStateType) => state.header.paths
export const autoRedirectSelector = (state: AppStateType) => state.header.autoRedirect
export const modalModeSelector = (state: AppStateType) => state.header.modalMode