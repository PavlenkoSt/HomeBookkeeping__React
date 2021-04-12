import PlanItem from "./PlanItem"
import M from 'materialize-css'
import localStore from '../../../localStore/localStore'

const PlanItemContainer = ({ id, name, bill, completed, sum, deletePlan, changeCompletedStatus, plans }) => {

    const progress = Math.round((bill / sum) * 100)
    const progressBar = completed ? 'Выполнено!' : (progress > 100 ? '100%' : progress + '%')
    const removeItem = () => {
        localStore.set('plans', plans.filter(plan => plan.id !== id))
        deletePlan(id)
        M.toast({html: 'План успешно удален!'})
    }

    return <PlanItem 
        id={id} 
        name={name} 
        bill={bill}
        completed={completed} 
        sum={sum}
        changeCompletedStatus={changeCompletedStatus} 
        progressBar={progressBar}
        removeItem={removeItem}
    />
}

export default PlanItemContainer