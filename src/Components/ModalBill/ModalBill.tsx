import s from './ModalBill.module.scss'
import ModalForm from './ModalForm/ModalForm'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import './ModalAnim.scss'
import { useDispatch, useSelector } from 'react-redux'
import { billSelector, historyTransactionsSelector } from '../../Redux/selectors/billSelectors'
import { modalModeSelector } from '../../Redux/selectors/headerSelectors'
import { changeBill } from '../../Redux/billReducer'
import { changeModalMode } from '../../Redux/headerReducer'
import { SubmitHandler } from 'redux-form'
import { FC } from 'react'

const ModalBill: FC = () => {
    const dispatch = useDispatch()
    const bill = useSelector(billSelector)
    const historyTransactions = useSelector(historyTransactionsSelector)
    const modalMode = useSelector(modalModeSelector)

    const onSubmit: SubmitHandler<{}, {}, string> = (formData: any) => {
        dispatch(changeBill(+formData.newBill))
        M.toast({html: 'Текущий баланс успешно изменен!'})
        dispatch(changeModalMode(false))
    }

    const cancelModalMode = () => {
        dispatch(changeModalMode(false))
    }
    
    const defaultHeaderText = (bill === 0 && !historyTransactions.length) ? 'Введите ваш текущий баланс' : 'Текущий баланс'

    return (
        <>
            <TransitionGroup>
                { modalMode &&
                    <CSSTransition classNames='anim' timeout={400} > 
                        <div className={s.layout}>
                            <div className={s.modal}>
                                <button className={s.closeBtn} onClick={cancelModalMode}>&#10006;</button>
                                <h2 className={s.header}>{defaultHeaderText}</h2>
                                <ModalForm onSubmit={onSubmit}/>
                            </div>
                        </div>
                    </CSSTransition>
                }
            </TransitionGroup>
        </>
    )
}

export default ModalBill