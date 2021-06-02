import { FC } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import localStore from '../../../localStore/localStore'
import { changeCompletedStatus, deletePlan, PlanType } from '../../../Redux/budgetReducer'
import { billSelector } from '../../../Redux/selectors/billSelectors'
import { plansSelector } from '../../../Redux/selectors/budgetSelectors'
import s from './PlanItem.module.scss'

type PlanItemPropsType = {
    id: number
    name: string
    completed: boolean
    sum: number
}

const PlanItem: FC<PlanItemPropsType> = ({ id, name, completed, sum }) => {
    const dispatch = useDispatch()
    const plans = useSelector(plansSelector)
    const bill = useSelector(billSelector)

    const progress = Math.round((bill / sum) * 100)
    const progressBar = completed ? 'Выполнено!' : (progress > 100 ? '100%' : progress + '%')
    const removeItem = () => {
        localStore.set('plans', plans.filter((plan: PlanType) => plan.id !== id))
        dispatch(deletePlan(id))
        M.toast({html: 'План успешно удален!'})
    }

    const toggleCompletedStatus = () => {
        dispatch(changeCompletedStatus(id, !completed))
    }

    return (
        <div className={s.item}>
            <label>
                <input onChange={toggleCompletedStatus} type="checkbox" checked={completed}  />
                <span className={s.name}>{name}</span>
            </label>
            <div title={progressBar} className={s.progress}>
                <div className={s.line}>
                    <div className={s.subline} style={{width: completed ? '100%' : progressBar}}></div>
                </div>
            </div>
            <div className={s.bill}>{completed ? `${sum}₴` : `${bill} / ${sum}`}</div>
            <button onClick={removeItem} className={s.removeBtn}>Удалить</button>
        </div>
    )
}

export default PlanItem