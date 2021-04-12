import Limits from "./Limits"
import M from 'materialize-css'
import { useEffect } from "react"
import localStore from "../../localStore/localStore"
import { connect } from "react-redux"
import { reset } from "redux-form"
import { deleteLimit, addNewLimit } from '../../Redux/budgetReducer'
import LimitItemContainer from "./LimitItem/LimitItemContainer"

const LimitsContainer = ({ limits, deleteLimit, addNewLimit, reset, historyTransactions }) => {
    const limitItems = limits.map(limit => <LimitItemContainer key={limit.id} id={limit.id} category={limit.category} sum={limit.limit} deadline={limit.deadline} deleteLimit={deleteLimit} limits={limits} historyTransactions={historyTransactions} />)
    const onSubmit = formData => {
        addNewLimit({
            id: Date.now(),
            category: formData.category,
            limit: formData.limit,
            deadline: [
                new Date().getFullYear(),
                new Date().getMonth(),
                new Date().getDate() + +formData.days
            ]
        })
        reset('add-new-limit')
        M.toast({html: 'Лимит успешно добавлен!'})
    }
    useEffect(() => {
        if(limits.length){
            localStore.set('limits', limits)
        }
    }, [limits])

    return <Limits limitItems={limitItems} onSubmit={onSubmit} />
}

const mapStateToProps = state => ({
    limits: state.budget.limits,
    historyTransactions: state.bill.historyTransactions
})

export default connect(mapStateToProps, { deleteLimit, addNewLimit, reset })(LimitsContainer)
