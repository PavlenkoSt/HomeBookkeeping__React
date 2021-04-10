import { connect } from 'react-redux'
import s from './ModalBill.module.css'
import ModalForm from './ModalForm/ModalForm'
import { changeModalMode } from '../../Redux/headerReducer'
import { changeBill } from '../../Redux/billReducer'
import M from 'materialize-css'

const ModalBill = ({ changeModalMode, bill, changeBill, historyTransactions }) => {
    const onSubmit = formData => {
        changeBill(+formData.newBill)
        M.toast({html: 'Текущий баланс успешно изменен!'})
        changeModalMode(false)
    }
    const defaultHeaderText = (bill === 0 && !historyTransactions.length) ? 'Введите ваш текущий баланс' : 'Текущий баланс'
    return (
        <div className={s.layout}>
            <div className={s.modal}>
                <button className={s.closeBtn} onClick={() => changeModalMode(false)}>	&#10006;</button>
                <h2 className={s.header}>{defaultHeaderText}</h2>
                <ModalForm onSubmit={onSubmit} bill={bill}/>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    bill: state.bill.bill,
    historyTransactions: state.bill.historyTransactions,
})

export default connect(mapStateToProps, { changeModalMode, changeBill })(ModalBill)