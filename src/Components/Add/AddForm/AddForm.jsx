import { reduxForm } from "redux-form";
import s from './AddForm.module.css'
import fieldStyles from './FieldCreator/FieldCreator.module.css'
import { FieldCreator } from './FieldCreator/FieldCreator'
import { compose } from "redux";
import { connect } from "react-redux";
import React from "react";
import { useEffect } from "react";
import { reset } from 'redux-form'
import { required } from '../../../utilts/validators'

const AddForm = React.memo(({ addModePlus, handleSubmit, reset, valid }) => {
    const formRef = React.createRef()

    const clearInputsClasses = () => {
        formRef.current.childNodes.forEach((el, i) => {
            if(i === 1){
                el.childNodes.forEach(label => label.classList.remove(fieldStyles.set))
            }else if(i === 3){
                return false
            }else{
                el.classList.remove(fieldStyles.set)
            }
        })
    }

    useEffect(() => {
        reset('add-transaction')
        clearInputsClasses()
    }, [addModePlus] )

    return (
        <form ref={formRef} onSubmit={handleSubmit} className={s.form}>
            { FieldCreator( addModePlus, 'sum', 'Сумма:', required, 'number') }
            <div className={s.double}>
                { FieldCreator( addModePlus, 'from', 'Откуда:', addModePlus ? required : null, 'text', s.labelD, !addModePlus) }
                { FieldCreator( addModePlus, 'to', 'Куда:', !addModePlus ? required : null, 'text', s.labelD, addModePlus) }
            </div>
            { FieldCreator( addModePlus, 'desc', 'Описание:', null) }
            <input onClick={() => valid ? clearInputsClasses() : null} className={ s.btn + ' ' + (addModePlus ? s.btnPlus : s.btnMinus)} type="submit" value="Сохранить" />
        </form>
    )
}) 

const mapStateToProps = state => ({
    addModePlus: state.bill.addModePlus
})

export default compose(
    connect(mapStateToProps, { reset }),
    reduxForm({ form: 'add-transaction' })
)(AddForm)