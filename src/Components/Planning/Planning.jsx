import s from './Planning.module.css'
import AddPlanForm from './AddPlanForm/AddPlanForm'

const Planning = ({ planItems, onSubmit }) => {
    return (
        <div className={s.container}>
            {planItems.length ? planItems : <div className={s.noPlans}>Планов пока нет. Добавьте новую задачу.</div>}
            <AddPlanForm onSubmit={onSubmit} />
        </div>
    )
}


export default Planning