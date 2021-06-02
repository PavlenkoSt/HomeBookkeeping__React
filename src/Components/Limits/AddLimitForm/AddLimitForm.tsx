import React, { FC } from 'react'
import { compose } from 'redux'
import { Field, InjectedFormProps, reduxForm } from 'redux-form'
import { removeSet, addSet } from '../../../helpers/manageFormClasses'
import { required } from '../../../utilts/validators'
import { Input } from '../../Add/AddForm/FieldCreator/FieldCreator'
import s from '../../Planning/AddPlanForm/AddPlanForm.module.scss'
import s2 from './AddLimitForm.module.scss'
import manageFormClasses from '../../../helpers/manageFormClasses.module.scss'

const AddLimitForm: FC<InjectedFormProps<{}, {}> & {}> = ({ handleSubmit, valid }) => {

    const formRef = React.createRef()

    const clearInputsClasses = () => {
        //@ts-ignore
        formRef.current.childNodes[0].childNodes.forEach(label => label.classList.remove(manageFormClasses.set));
    }

    // @ts-ignore
    return ( <form ref={formRef} onSubmit={handleSubmit} className={s.form}>
            <div className={s.inputsGroup}>
                <label className={`${s.label} ${s2.label}`}> 
                    <span className={s.span}>Категория:</span>
                    <Field 
                        onFocus={addSet} 
                        onBlur={removeSet}
                        name='category' 
                        component={Input} 
                        className={`${s.input} ${s2.input}`} 
                        validate={required}
                        autoComplete='off'     
                    />
                </label>
                <label className={`${s.label} ${s2.label}`}> 
                    <span className={s.span}>Лимит:</span>
                    <Field 
                        onFocus={addSet} 
                        onBlur={removeSet}
                        name='limit' 
                        component={Input}
                        type='number'
                        className={`${s.input} ${s2.input}`}
                        validate={required}
                        autoComplete='off' 
                    />
                </label>
                <label className={`${s.label} ${s2.label}`}> 
                    <span className={s.span}>Количество дней:</span>
                    <Field 
                        onFocus={addSet} 
                        onBlur={removeSet}
                        name='days' 
                        component={Input}
                        type='number'
                        className={`${s.input} ${s2.input}`}
                        validate={required} 
                        autoComplete='off'    
                    />
                </label>
            </div>
            <button onClick={() => valid ? clearInputsClasses() : null} className={s.submit} type='submit'>Добавить</button>
        </form>
    )
}

export default compose(
    reduxForm<{}, {}>({ form: 'add-new-limit' })
)(AddLimitForm)