import s from './Limits.module.scss'
import AddLimitForm from "./AddLimitForm/AddLimitForm"
import { FC, useEffect } from 'react'
import { reset } from 'redux-form'
import { useDispatch, useSelector } from 'react-redux'
import { addNewLimit, LimitType } from '../../Redux/budgetReducer'
import { limitsSelector } from '../../Redux/selectors/budgetSelectors'
import localStore from '../../localStore/localStore'
import LimitItem from './LimitItem/LimitItem'

const Limits: FC = () => {
    const dispatch = useDispatch()
    const limits = useSelector(limitsSelector)
    const limitItems = limits.map((limit: LimitType) => <LimitItem 
        key={limit.id} 
        id={limit.id} 
        category={limit.category} 
        sum={limit.limit} 
        deadline={limit.deadline} 
    />)

    const onSubmit = (formData: any) => {
        if(!formData.category || !formData.limit || !formData.days){
            M.toast({html: 'Ошибка! Лимит не может быть пустым!'})
        }else{
            dispatch(addNewLimit({
                id: Date.now(),
                category: formData.category,
                limit: formData.limit,
                deadline: [
                    new Date().getFullYear(),
                    new Date().getMonth(),
                    new Date().getDate() + +formData.days
                ]
            }))
            dispatch(reset('add-new-limit'))
            M.toast({html: 'Лимит успешно добавлен!'})
        }
    }

    useEffect(() => {
        if(limits.length){
            localStore.set('limits', limits)
        }
    }, [limits])

    return (
        <div className={s.container}>
            {limitItems.length ? limitItems : <div className={s.noLimits}>Лимитов пока нет. Добавьте первый.</div>}
            <AddLimitForm onSubmit={onSubmit}/>
        </div>
    )
}

export default Limits
