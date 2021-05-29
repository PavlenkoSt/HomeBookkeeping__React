import { reduxForm } from "redux-form"
import s from './AddForm.module.css'
import fieldStyles from './FieldCreator/FieldCreator.module.css'
import { FieldCreator } from './FieldCreator/FieldCreator'
import { compose } from "redux"
import { connect } from "react-redux"
import React, { FC, FormEventHandler } from "react"
import { useEffect } from "react"
import { reset } from 'redux-form'
import { required } from '../../../utilts/validators'
import { AppStateType } from "../../../Redux/reduxStore"

type AddFormPropsType = {
    valid: boolean
    handleSubmit: FormEventHandler<HTMLFormElement>
}

type MapStatePropsType = {
    addModePlus: boolean
}

type MapDispatchPropsType = {
    reset: (formName: string) => void
}

type RefType = {
    current: {
        childNodes: Array<ChildNode & {
            classList: any
        }>
    }
}

const AddForm: FC<AddFormPropsType & MapStatePropsType & MapDispatchPropsType> = React.memo(({ addModePlus, handleSubmit, reset, valid }) => {
    const formRef = React.createRef() as RefType

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
        reset('add-transaction')
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

const mapStateToProps = (state: AppStateType) => ({
    addModePlus: state.bill.addModePlus
})

export default compose(
    connect<MapStatePropsType, MapDispatchPropsType, AddFormPropsType, AppStateType>(mapStateToProps, { reset }),
    reduxForm<{}, AddFormPropsType>({ form: 'add-transaction' })
)(AddForm)