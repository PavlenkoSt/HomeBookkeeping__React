import s from './manageFormClasses.module.css'

export const removeSet = (e: any) => e.target?.labels[0].classList.remove(e.target.value ? s.none : s.set)
export const addSet = (e: any) => e.target.labels[0].classList.add(s.set)