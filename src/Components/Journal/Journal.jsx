import s from './Journal.module.css'
import { connect } from "react-redux"
import Table from './Table/Table'
import { deleteTransactionSuccess, incomeToBill, outcomeFromBill } from '../../Redux/billReducer'

const Journal = ({ historyTransactions, deleteTransactionSuccess, incomeToBill, outcomeFromBill }) => {

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

const mapStateToProps = state => ({
    historyTransactions: state.bill.historyTransactions
})

export default connect(mapStateToProps, { deleteTransactionSuccess, incomeToBill, outcomeFromBill })(Journal)