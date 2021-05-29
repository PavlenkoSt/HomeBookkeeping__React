import s from './Journal.module.css'
import { connect } from "react-redux"
import Table from './Table/Table'
import { deleteTransactionSuccess, incomeToBill, outcomeFromBill } from '../../Redux/billReducer'
import { FC } from 'react'
import { AppStateType } from '../../Redux/reduxStore'
import { TransactionType } from '../../Redux/chartReducer'

type MapStatePropsType = {
    historyTransactions: Array<TransactionType>
}

type MapDispatchPropsType = {
    incomeToBill: (sum: string) => void
    outcomeFromBill: (sum: string) => void
    deleteTransactionSuccess: (id: number) => void
}

const Journal: FC<MapStatePropsType & MapDispatchPropsType> = ({ historyTransactions, deleteTransactionSuccess, incomeToBill, outcomeFromBill }) => {

    if(!historyTransactions.length){
        return <div className={s.noRecords}>Записей пока нет.</div>
    }
    return (
        <div>
            <Table 
                historyTransactions={ historyTransactions } 
                deleteTransactionSuccess={ deleteTransactionSuccess } 
                incomeToBill={ incomeToBill }
                outcomeFromBill={ outcomeFromBill }
                />
        </div>
    )
}

const mapStateToProps = (state: AppStateType) => ({
    historyTransactions: state.bill.historyTransactions
})

export default connect(mapStateToProps, { deleteTransactionSuccess, incomeToBill, outcomeFromBill })(Journal)