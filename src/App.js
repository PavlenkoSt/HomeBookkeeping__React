import './App.css';
import "typeface-roboto";
import Header from './Components/Header/Header';
import { Redirect, Route, withRouter } from 'react-router';
import { compose } from 'redux';
import Subheader from './Components/Subheader/Subheader';
import Add from './Components/Add/Add';
import 'materialize-css';
import Journal from './Components/Journal/Journal';
import { useEffect } from 'react';
import localStore from './localStore/localStore';
import { connect } from 'react-redux';
import { synhronizedHistoryTransactionFromLocalStorage, synhronizedBillFromLocalStorage } from './Redux/billReducer'
import { changeModalMode } from './Redux/headerReducer'
import Reports from './Components/Reports/Reports';
import ModalBill from './Components/ModalBill/ModalBill';


const App = ({ location, synhronizedHistoryTransactionFromLocalStorage, synhronizedBillFromLocalStorage, bill, modalMode, historyTransactions, changeModalMode }) => {

    useEffect(() => {
      const result = localStore.history.get()
      if(result && result.length){
        synhronizedHistoryTransactionFromLocalStorage(result)
      }
    }, [])

    useEffect(() => {
      const result = localStore.bill.get()
      if(result){
        synhronizedBillFromLocalStorage(result)
      }
    }, [])

    useEffect(() => {
      localStore.bill.set(bill)
    }, [bill])
    
    useEffect(() => {
      if(bill === 0 && !historyTransactions.length && !localStore.history.get() ){
        changeModalMode(true)
      }else{
        changeModalMode(false)
      }
    }, [bill, historyTransactions])

  return (
    <div className='app'>
      <Header location={location} />
      <Subheader/>
      <Route path='/'><Redirect to='/add'/></Route>
      <Route path='/add' component={Add} />
      <Route path='/statistics/journal' component={Journal}/>
      <Route path='/statistics/reports' component={Reports}/>
      {
        modalMode && <ModalBill
      />}
    </div>
  )
}

const mapStateToProps = state => ({
  bill: state.bill.bill,
  modalMode: state.header.modalMode,
  historyTransactions: state.bill.historyTransactions,
})

export default compose(
  withRouter,
  connect(mapStateToProps, { synhronizedHistoryTransactionFromLocalStorage, synhronizedBillFromLocalStorage, changeModalMode })
)(App);
