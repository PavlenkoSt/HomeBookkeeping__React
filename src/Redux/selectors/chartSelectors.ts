import { AppStateType } from './../reduxStore'

export const showModeIncomeSelector = (state: AppStateType) => state.chart.showModeIncome
export const showTimeModeSelector = (state: AppStateType) => state.chart.showTimeMode
export const filteredItemsSelector = (state: AppStateType) => state.chart.filteredItems
export const activeCategorySelector = (state: AppStateType) => state.chart.activeCategory
export const generalSumSelector = (state: AppStateType) => state.chart.generalSum