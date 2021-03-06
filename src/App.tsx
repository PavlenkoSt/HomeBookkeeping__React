import './App.scss'
import 'materialize-css'
import React, { FC, useEffect } from 'react'
import { Redirect, Route } from 'react-router'
import Header from './Components/Header/Header'
import Subheader from './Components/Subheader/Subheader'
import Journal from './Components/Journal/Journal'
import Reports from './Components/Reports/Reports'
import Add from './Components/Add/Add'
import ModalBill from './Components/ModalBill/ModalBill'
import Planning from './Components/Planning/Planning'
import Limits from './Components/Limits/Limits'
import withTransition from './HOC/withTransition'
import Preloader from './Components/common/Preloader/Preloader'
import { useDispatch, useSelector } from 'react-redux'
import { changeLoadStatus, synhronizedBillFromLocalStorage, synhronizedHistoryTransactionFromLocalStorage } from './Redux/billReducer'
import { synhronizedLimitsFromLocalStorage, synhronizedPlansFromLocalStorage } from './Redux/budgetReducer'
import localStore from './localStore/localStore'
import { billSelector, historyTransactionsSelector, loadSelector } from './Redux/selectors/billSelectors'
import { changeModalMode } from './Redux/headerReducer'

const App: FC = () => {
    const dispatch = useDispatch()
    const bill = useSelector(billSelector)
    const historyTransactions = useSelector(historyTransactionsSelector)
    const load = useSelector(loadSelector)

    useEffect(() => {
        const history = localStore.get('history')
        if(history && history.length){
            dispatch(synhronizedHistoryTransactionFromLocalStorage(history))
        }

        const bill = localStore.get('bill')
        if(bill){
            dispatch(synhronizedBillFromLocalStorage(bill))
        }

        const plans = localStore.get('plans')
        if(plans){
            dispatch(synhronizedPlansFromLocalStorage(plans))
        }

        const limits = localStore.get('limits')
        if(limits){
            dispatch(synhronizedLimitsFromLocalStorage(limits))
        }

        dispatch(changeLoadStatus(true))
    }, [])

    useEffect(() => {
        localStore.set('bill', bill)         
    }, [bill])
      
    useEffect(() => {
        if(bill === 0 && !historyTransactions.length && !localStore.get('history') && load){
            dispatch(changeModalMode(true))
        }else{
            dispatch(changeModalMode(false))
        }
    }, [load])

    return (
        <div className='app'>
            <Preloader />
            {/* @ts-ignore */}
            <Header/>
            <Subheader/>

            <Route path='/'><Redirect to='/add'/></Route>
            <Route path='/add'>{withTransition(Add)}</Route>
            <Route path='/statistics/journal'>{withTransition(Journal)}</Route>
            <Route path='/statistics/reports'>{withTransition(Reports)}</Route>
            <Route path='/budget/planning'>{withTransition(Planning)}</Route>
            <Route path='/budget/limits'>{withTransition(Limits)}</Route>

            <ModalBill />
        </div>
    )
}

export default App