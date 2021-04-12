import { reduxForm } from "redux-form";
import s from './AddForm.module.css'
import fieldStyles from './FieldCreator/FieldCreator.module.css'
import { FieldCreator } from './FieldCreator/FieldCreator'
import { compose } from "redux";
import { connect } from "react-redux";
import React from "react";
import { useEffect } from "react";
import { reset } from 'redux-form'

const AddForm = React.memo(({ addModePlus, handleSubmit, reset }) => {

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
            { FieldCreator( addModePlus, 'input', 'sum', 'Сумма:', 'number') }
            <div className={s.double}>
                { FieldCreator( addModePlus, 'input', 'from', 'Откуда:', 'text', s.labelD, !addModePlus) }
                { FieldCreator( addModePlus, 'input', 'to', 'Куда:', 'text', s.labelD, addModePlus) }
            </div>
            { FieldCreator( addModePlus, 'input', 'desc', 'Описание:') }
            <input onClick={clearInputsClasses} className={ s.btn + ' ' + (addModePlus ? s.btnPlus : s.btnMinus)} type="submit" value="Сохранить" />
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