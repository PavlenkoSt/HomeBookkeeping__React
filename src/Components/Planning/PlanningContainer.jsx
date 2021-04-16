import Planning from "./Planning"
import localStore from '../../localStore/localStore'
import M from 'materialize-css'
import { useEffect } from 'react'
import { reset } from 'redux-form'
import { deletePlan, changeCompletedStatus, addNewPlan } from '../../Redux/budgetReducer'
import { connect } from 'react-redux'
import PlanItemContainer from "./PlanItem/PlanItemContainer"


const PlanningContainer = ({ plans, bill, addNewPlan, reset, deletePlan, changeCompletedStatus}) => {
    const planItems = plans.map(plan => <PlanItemContainer 
        key={plan.id} 
        id={plan.id} 
        name={plan.task} 
        bill={bill} 
        sum={plan.sum} 
        completed={plan.completed} 
        deletePlan={deletePlan} 
        changeCompletedStatus={changeCompletedStatus} 
        plans={plans} 
    />)

    const onSubmit = formData => {
        if(!formData.task || !formData.sum){
            M.toast({html: 'Ошибка! План не может быть пустым!'})
        }else{
            addNewPlan({
                id: Date.now(),
                task: formData.task,
                sum: formData.sum,
                completed: false
            })
            reset('add-new-plan')
            M.toast({html: 'План успешно добавлен!'})
        }
    }

    useEffect(() => {
        if(plans.length){
            localStore.set('plans', plans)
        }
    },[plans])


    return <Planning planItems={planItems} onSubmit={onSubmit} />
}

const mapStateToProps = state => ({
    plans: state.budget.plans,
    bill: state.bill.bill
})

export default connect(mapStateToProps, { deletePlan, changeCompletedStatus, addNewPlan, reset })(PlanningContainer)