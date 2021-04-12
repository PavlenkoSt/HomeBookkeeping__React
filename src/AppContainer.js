import App from "./App"
import { connect } from 'react-redux';
import { synhronizedHistoryTransactionFromLocalStorage, synhronizedBillFromLocalStorage } from './Redux/billReducer'
import { changeModalMode } from './Redux/headerReducer'
import { synhronizedPlansFromLocalStorage, synhronizedLimitsFromLocalStorage } from './Redux/budgetReducer'
import { useEffect } from 'react';
import localStore from './localStore/localStore';

const AppContainer = ({ synhronizedHistoryTransactionFromLocalStorage, synhronizedBillFromLocalStorage, bill, modalMode, historyTransactions, changeModalMode, synhronizedPlansFromLocalStorage, synhronizedLimitsFromLocalStorage}) => {
    useEffect(() => {
        const result = localStore.get('history')
        if(result && result.length){
          synhronizedHistoryTransactionFromLocalStorage(result)
        }
    }, [])
  
    useEffect(() => {
        const result = localStore.get('bill')
        if(result){
          synhronizedBillFromLocalStorage(result)
        }
    }, [])
  
    useEffect(() => {
        const result = localStore.get('plans')
        if(result){
            synhronizedPlansFromLocalStorage(result)
        }
    }, [])
  
    useEffect(() => {
        const result = localStore.get('limits')
        if(result){
          synhronizedLimitsFromLocalStorage(result)
        }
    }, [])
  
    useEffect(() => {
        localStore.set('bill', bill)
    }, [bill])
      
    useEffect(() => {
        if(bill === 0 && !historyTransactions.length && !localStore.get('history') ){
          changeModalMode(true)
        }else{
          changeModalMode(false)
        }
    }, [bill, historyTransactions])

    return <App modalMode={modalMode}/>
}

const mapStateToProps = state => ({
    bill: state.bill.bill,
    modalMode: state.header.modalMode,
    historyTransactions: state.bill.historyTransactions,
})

export default connect(mapStateToProps, { synhronizedHistoryTransactionFromLocalStorage, synhronizedBillFromLocalStorage, changeModalMode, synhronizedPlansFromLocalStorage, synhronizedLimitsFromLocalStorage })(AppContainer)