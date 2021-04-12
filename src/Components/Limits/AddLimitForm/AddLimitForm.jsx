import React from 'react'
import { compose } from 'redux'
import { Field, reduxForm } from 'redux-form'
import { removeSet, addSet } from '../../../helpers/manageFormClasses'
import s from '../../Planning/AddPlanForm/AddPlanForm.module.css'
import s2 from './AddLimitForm.module.css'


const AddLimitForm = ({ handleSubmit }) => {

    const formRef = React.createRef()

    const clearInputsClasses = () => {
        formRef.current.childNodes[0].childNodes.forEach(label => label.classList.remove(s.set));
    }

    return (
        <form ref={formRef} onSubmit={handleSubmit} className={s.form}>
            <div className={s.inputsGroup}>
                <label className={`${s.label} ${s2.label}`}> 
                    <span className={s.span}>Категория:</span>
                    <Field 
                    onFocus={addSet} 
                    onBlur={removeSet}
                    name='category' 
                    component='input' 
                    className={`${s.input} ${s2.input}`} />
                </label>
                <label className={`${s.label} ${s2.label}`}> 
                    <span className={s.span}>Лимит:</span>
                    <Field 
                    onFocus={addSet} 
                    onBlur={removeSet}
                    name='limit' 
                    component='input' 
                    type='number'
                    className={`${s.input} ${s2.input}`} />
                </label>
                <label className={`${s.label} ${s2.label}`}> 
                    <span className={s.span}>Количество дней:</span>
                    <Field 
                    onFocus={addSet} 
                    onBlur={removeSet}
                    name='days' 
                    component='input' 
                    type='number'
                    className={`${s.input} ${s2.input}`} />
                </label>
            </div>
            <button onClick={clearInputsClasses} className={s.submit} type='submit'>Добавить</button>
        </form>
    )
}

export default compose(
    reduxForm({ form: 'add-new-limit' })
)(AddLimitForm)