import s from '../Components/Planning/AddPlanForm/AddPlanForm.module.css'

export const removeSet = e =>{ e.target.labels[0].classList.remove(e.target.value ? s.none : s.set)}
export const addSet = e => e.target.labels[0].classList.add(s.set)