import { useEffect } from "react"
import { compose } from "redux"
import { Field, reduxForm } from "redux-form"
import s from '../ModalBill.module.css'


const ModalForm = ({ handleSubmit, initialize, bill }) => {
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
    reduxForm({ form: 'currentBill' })
)(ModalForm)