import { FC, useEffect } from "react"
import { useSelector } from "react-redux"
import { compose } from "redux"
import { Field, InjectedFormProps, reduxForm } from "redux-form"
import { billSelector } from "../../../Redux/selectors/billSelectors"
import s from '../ModalBill.module.css'

const ModalForm: FC<InjectedFormProps<{}, {}> & {}> = ({ handleSubmit, initialize}) => {
    const bill = useSelector(billSelector)

    useEffect(() => {
        initialize({
            newBill: bill || '0'
        })
    }, [])
    
    return (
        <form onSubmit={handleSubmit}>
            <Field type="number" name='newBill' component='input'/> 
            <button className={s.okBtn} type='submit'>Принять</button>
        </form>
    )
}

export default compose(
    reduxForm<{}, {}>({ form: 'currentBill' })
)(ModalForm)