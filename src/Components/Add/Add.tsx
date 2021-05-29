import { FC } from 'react'
import getCurrentDate from '../../helpers/currentDate'
import s from './Add.module.css'
import AddForm from './AddForm/AddForm'
import { FormDataType } from './AddContainer'

type AddPropsType = {
    onSubmit: (formData: FormDataType) => false | undefined
}

const Add: FC<AddPropsType> = ({ onSubmit}) => {
    return (
        <div className={s.container}>
            {/* @ts-ignore */}
            <AddForm onSubmit={onSubmit}/>
            <div className={s.date}>{getCurrentDate()}</div>
        </div>
    )
}

export default Add