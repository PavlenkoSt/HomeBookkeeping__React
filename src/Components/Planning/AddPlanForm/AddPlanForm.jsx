import React from 'react'
import { compose } from 'redux'
import { Field, reduxForm } from 'redux-form'
import { removeSet, addSet } from '../../../helpers/manageFormClasses'
import s from './AddPlanForm.module.css'

const AddPlanForm = React.memo(({ handleSubmit }) => {

    const formRef = React.createRef()

    const clearInputsClasses = () => {
        formRef.current.childNodes[0].childNodes.forEach(label => label.classList.remove(s.set));
    }

    return (
        <form ref={formRef} onSubmit={handleSubmit} className={s.form}>
            <div className={s.inputsGroup}>
                <label className={s.label}> 
                    <span className={s.span}>Задача:</span>
                    <Field 
                    onFocus={addSet} 
                    onBlur={removeSet}
                    name='task' 
                    component='input' 
                    className={s.input} />
                </label>
                <label className={s.label}> 
                    <span className={s.span}>Необходимая сумма:</span>
                    <Field 
                    onFocus={addSet} 
                    onBlur={removeSet}
                    name='sum' 
                    component='input' 
                    type='number'
                    className={s.input} />
                </label>
            </div>
            <button onClick={clearInputsClasses} className={s.submit} type='submit'>Добавить</button>
        </form>
    )
})

export default compose(
    reduxForm({ form: 'add-new-plan' })
)(AddPlanForm)