import { InjectedFormProps, reduxForm } from "redux-form"
import s from './AddForm.module.scss'
import fieldStyles from './FieldCreator/FieldCreator.module.scss'
import { FieldCreator } from './FieldCreator/FieldCreator'
import { useDispatch, useSelector } from "react-redux"
import React, { ComponentType, FC, FormEventHandler } from "react"
import { useEffect } from "react"
import { reset } from 'redux-form'
import { required } from '../../../utilts/validators'
import { addModePlusSelector } from "../../../Redux/selectors/billSelectors"

type AddFormPropsType = {
    valid: boolean
    handleSubmit: FormEventHandler<HTMLFormElement>
}

type RefType = {
    current: {
        childNodes: Array<ChildNode & {
            classList: any
        }>
    }
}

const AddForm: ComponentType<AddFormPropsType & InjectedFormProps<{}, AddFormPropsType, string>> = React.memo(({ handleSubmit, valid }) => {
    const formRef = React.createRef() as RefType
    const dispatch = useDispatch()
    
    const addModePlus = useSelector(addModePlusSelector)

    const clearInputsClasses = () => {
        formRef.current.childNodes.forEach((el, i) => {
            if(i === 3){
                return false
            }else{
                el.classList.remove(fieldStyles.set)
            }
        })
    }

    useEffect(() => {
        dispatch(reset('add-transaction'))
        clearInputsClasses()
    }, [addModePlus] )
    
    // @ts-ignore
    return ( <form ref={formRef} onSubmit={handleSubmit} className={s.form}>
            { FieldCreator( addModePlus, 'sum', 'Сумма:', required, 'number') }
            { FieldCreator( addModePlus, 'category', 'Категория:', required , 'text') }
            { FieldCreator( addModePlus, 'desc', 'Описание:', undefined) }
            <input onClick={() => valid ? clearInputsClasses() : null} className={ s.btn + ' ' + (addModePlus ? s.btnPlus : s.btnMinus)} type="submit" value="Сохранить" />
        </form>
    )
}) 

export default reduxForm<{}, AddFormPropsType>({ form: 'add-transaction' })(AddForm)