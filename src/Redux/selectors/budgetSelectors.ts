import { AppStateType } from './../reduxStore'

export const plansSelector = (state: AppStateType) => state.budget.plans
export const limitsSelector = (state: AppStateType) => state.budget.limits