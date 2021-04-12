import s from './ModalBill.module.css'
import ModalForm from './ModalForm/ModalForm'

const ModalBill = ({ bill, onSubmit, cancelModalMode, defaultHeaderText }) => {
    return (
        <div className={s.layout}>
            <div className={s.modal}>
                <button className={s.closeBtn} onClick={cancelModalMode}>&#10006;</button>
                <h2 className={s.header}>{defaultHeaderText}</h2>
                <ModalForm onSubmit={onSubmit} bill={bill}/>
            </div>
        </div>
    )
}

export default ModalBill