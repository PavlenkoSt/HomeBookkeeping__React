import s from './ModalBill.module.css'
import ModalForm from './ModalForm/ModalForm'
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import './ModalAnim.css'

const ModalBill = ({ bill, onSubmit, cancelModalMode, defaultHeaderText, modalMode }) => {
    return (
        <>
            <TransitionGroup>
                { modalMode && 
                    <CSSTransition classNames='anim' timeout={400} > 
                        <div className={s.layout}>
                            <div className={s.modal}>
                                <button className={s.closeBtn} onClick={cancelModalMode}>&#10006;</button>
                                <h2 className={s.header}>{defaultHeaderText}</h2>
                                <ModalForm onSubmit={onSubmit} bill={bill}/>
                            </div>
                        </div>
                    </CSSTransition>
                }
            </TransitionGroup>
        </>
    )
}

export default ModalBill