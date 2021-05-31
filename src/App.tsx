import './App.css'
import 'materialize-css'
import React, { FC, useEffect } from 'react'
import { Redirect, Route } from 'react-router'
import Header from './Components/Header/Header'
import Subheader from './Components/Subheader/Subheader'
import Journal from './Components/Journal/Journal'
import Reports from './Components/Reports/Reports'
import Add from './Components/Add/Add'
import ModalBillContainer from './Components/ModalBill/ModalBillContainer'
import PlanningContainer from './Components/Planning/PlanningContainer'
import Limits from './Components/Limits/Limits'
import withTransition from './HOC/withTransition'
import Preloader from './Components/common/Preloader/Preloader'
import { useDispatch, useSelector } from 'react-redux'
import { changeLoadStatus, synhronizedBillFromLocalStorage, synhronizedHistoryTransactionFromLocalStorage } from './Redux/billReducer'
import { synhronizedLimitsFromLocalStorage, synhronizedPlansFromLocalStorage } from './Redux/budgetReducer'
import localStore from './localStore/localStore'
import { billSelector, historyTransactionsSelector } from './Redux/selectors/billSelectors'
import { changeModalMode } from './Redux/headerReducer'

const App: FC = () => {
    const dispatch = useDispatch()
    const bill = useSelector(billSelector)
    const historyTransactions = useSelector(historyTransactionsSelector)

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
        if(bill === 0 && !historyTransactions.length && !localStore.get('history') ){
            dispatch(changeModalMode(true))
        }else{
            dispatch(changeModalMode(false))
        }
    }, [bill, historyTransactions])
    
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
            <Route path='/budget/planning'>{withTransition(PlanningContainer)}</Route>
            <Route path='/budget/limits'>{withTransition(Limits)}</Route>

            <ModalBillContainer />
        </div>
    )
}

export default App