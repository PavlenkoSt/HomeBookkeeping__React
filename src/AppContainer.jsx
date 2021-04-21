import App from "./App"
import { connect } from 'react-redux';
import { synhronizedHistoryTransactionFromLocalStorage, synhronizedBillFromLocalStorage, changeLoadStatus } from './Redux/billReducer'
import { changeModalMode } from './Redux/headerReducer'
import { synhronizedPlansFromLocalStorage, synhronizedLimitsFromLocalStorage } from './Redux/budgetReducer'
import { useEffect } from 'react';
import localStore from './localStore/localStore';

const AppContainer = ({ synhronizedHistoryTransactionFromLocalStorage, synhronizedBillFromLocalStorage, bill, modalMode, historyTransactions, changeModalMode, synhronizedPlansFromLocalStorage, synhronizedLimitsFromLocalStorage, changeLoadStatus, load}) => {
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

  useEffect(() => {
    changeLoadStatus(true)
  }, [])

  return <App modalMode={modalMode} load={load}/>
}

const mapStateToProps = state => ({
  bill: state.bill.bill,
  modalMode: state.header.modalMode,
  historyTransactions: state.bill.historyTransactions,
  load: state.bill.load
})

export default connect(mapStateToProps, { synhronizedHistoryTransactionFromLocalStorage, synhronizedBillFromLocalStorage, changeModalMode, synhronizedPlansFromLocalStorage, synhronizedLimitsFromLocalStorage, changeLoadStatus })(AppContainer)