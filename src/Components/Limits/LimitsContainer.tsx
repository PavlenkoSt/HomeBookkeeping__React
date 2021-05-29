import Limits from "./Limits"
import M from 'materialize-css'
import { FC, useEffect } from "react"
import localStore from "../../localStore/localStore"
import { connect } from "react-redux"
import { reset } from "redux-form"
import { deleteLimit, addNewLimit, LimitType } from '../../Redux/budgetReducer'
import LimitItemContainer from "./LimitItem/LimitItemContainer"
import { AppStateType } from "../../Redux/reduxStore"
import { TransactionType } from "../../Redux/chartReducer"

type FormDateValuesType = {
    category: string
    limit: string
    days: string
}

type LimitsContainerPropsType = {
    limits: Array<LimitType>
    historyTransactions: Array<TransactionType>
    deleteLimit: (id: number) => void
    addNewLimit: (limit: LimitType) => void
    reset: (formName: string) => void
}

const LimitsContainer: FC<LimitsContainerPropsType> = ({ limits, deleteLimit, addNewLimit, reset, historyTransactions }) => {
    const limitItems = limits.map((limit: LimitType) => <LimitItemContainer key={limit.id} id={limit.id} category={limit.category} sum={limit.limit} deadline={limit.deadline} deleteLimit={deleteLimit} limits={limits} historyTransactions={historyTransactions} />)
    const onSubmit = (formData: FormDateValuesType) => {
        if(!formData.category || !formData.limit || !formData.days){
            M.toast({html: 'Ошибка! Лимит не может быть пустым!'})
        }else{
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
    }
    useEffect(() => {
        if(limits.length){
            localStore.set('limits', limits)
        }
    }, [limits])

    return <Limits limitItems={limitItems} onSubmit={onSubmit} />
}

const mapStateToProps = (state: AppStateType) => ({
    limits: state.budget.limits,
    historyTransactions: state.bill.historyTransactions
})

export default connect(mapStateToProps, { deleteLimit, addNewLimit, reset })(LimitsContainer)
