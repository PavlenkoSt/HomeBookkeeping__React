import ModalBill from "./ModalBill"
import { changeBill } from '../../Redux/billReducer'
import { changeModalMode } from '../../Redux/headerReducer'
import { connect } from "react-redux"
import M from 'materialize-css'

const ModalBillContainer = ({ bill, changeBill, historyTransactions, changeModalMode, modalMode }) => {
    const onSubmit = formData => {
        changeBill(+formData.newBill)
        M.toast({html: 'Текущий баланс успешно изменен!'})
        changeModalMode(false)
    }
    const cancelModalMode = () => {
        changeModalMode(false)
    }
    const defaultHeaderText = (bill === 0 && !historyTransactions.length) ? 'Введите ваш текущий баланс' : 'Текущий баланс'

    return <ModalBill onSubmit={onSubmit} defaultHeaderText={defaultHeaderText} cancelModalMode={cancelModalMode} bill={bill} modalMode={modalMode} />
}

const mapStateToProps = state => ({
    bill: state.bill.bill,
    historyTransactions: state.bill.historyTransactions,
    modalMode: state.header.modalMode
})

export default connect(mapStateToProps, { changeBill, changeModalMode })(ModalBillContainer)