import s from './Planning.module.scss'
import AddPlanForm from './AddPlanForm/AddPlanForm'
import { useDispatch, useSelector } from 'react-redux'
import { addNewPlan, PlanType } from '../../Redux/budgetReducer'
import { reset } from 'redux-form'
import { plansSelector } from '../../Redux/selectors/budgetSelectors'
import localStore from '../../localStore/localStore'
import { FC, useEffect } from 'react'
import PlanItem from './PlanItem/PlanItem'

const Planning: FC = () => {
    const dispatch = useDispatch()
    const plans = useSelector(plansSelector)

    const onSubmit = (formData: any) => {
        if(!formData.task || !formData.sum){
            M.toast({html: 'Ошибка! План не может быть пустым!'})
        }else{
            dispatch(addNewPlan({
                id: Date.now(),
                task: formData.task,
                sum: formData.sum,
                completed: false
            }))
            dispatch(reset('add-new-plan'))
            M.toast({html: 'План успешно добавлен!'})
        }
    }

    useEffect(() => {
        if(plans.length){
            localStore.set('plans', plans)
        }
    },[plans])

    const planItems = plans.map((plan: PlanType) => <PlanItem
        key={plan.id} 
        id={plan.id} 
        name={plan.task} 
        sum={+plan.sum} 
        completed={plan.completed} 
    />)

    return (
        <div className={s.container}>
            {planItems.length ? planItems : <div className={s.noPlans}>Планов пока нет. Добавьте новую задачу.</div>}
            <AddPlanForm onSubmit={onSubmit} />
        </div>
    )
}


export default Planning