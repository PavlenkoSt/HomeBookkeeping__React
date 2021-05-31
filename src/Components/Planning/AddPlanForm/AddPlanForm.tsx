import React, { FC } from 'react'
import { Field, InjectedFormProps, reduxForm } from 'redux-form'
import { removeSet, addSet } from '../../../helpers/manageFormClasses'
import { required } from '../../../utilts/validators'
import { Input } from '../../Add/AddForm/FieldCreator/FieldCreator'
import s from './AddPlanForm.module.css'
import manageFormClasses from '../../../helpers/manageFormClasses.module.css'


const AddPlanForm: FC<InjectedFormProps<{}, {}> & {}> = React.memo(({ handleSubmit, valid }) => {
    const formRef = React.createRef()

    const clearInputsClasses = () => {
        //@ts-ignore
        formRef.current.childNodes[0].childNodes.forEach(label => label.classList.remove(manageFormClasses.set))
    }

    //@ts-ignore
    return ( <form ref={formRef} onSubmit={handleSubmit} className={s.form}>
            <div className={s.inputsGroup}>
                <label className={s.label}> 
                    <span className={s.span}>Задача:</span>
                    <Field 
                        onFocus={addSet} 
                        onBlur={removeSet}
                        name='task' 
                        component={Input} 
                        className={s.input}
                        validate={required} 
                        autoComplete='off' 
                    />
                </label>
                <label className={s.label}> 
                    <span className={s.span}>Необходимая сумма:</span>
                    <Field 
                        onFocus={addSet} 
                        onBlur={removeSet}
                        name='sum' 
                        component={Input} 
                        type='number'
                        className={s.input}
                        validate={required} 
                        autoComplete='off' 
                    />
                </label>
            </div>
            <button onClick={() => valid ? clearInputsClasses() : null} className={s.submit} type='submit'>Добавить</button>
        </form>
    )
})

export default reduxForm<{}, {}>({ form: 'add-new-plan' })(AddPlanForm)