import './App.css';
import 'materialize-css';
import React from 'react';
import { Redirect, Route, withRouter } from 'react-router';
import Header from './Components/Header/Header';
import Subheader from './Components/Subheader/Subheader';
import Journal from './Components/Journal/Journal';
import Reports from './Components/Reports/Reports';
import AddContainer from './Components/Add/AddContainer';
import ModalBillContainer from './Components/ModalBill/ModalBillContainer';
import PlanningContainer from './Components/Planning/PlanningContainer';
import LimitsContainer from './Components/Limits/LimitsContainer';
import withTransition from './HOC/withTransition';
 
const App = ({ location }) => {
  return (
    <div className='app'>
      <Header location={location} />
      <Subheader/>
        <Route path='/'><Redirect to='/add'/></Route>
        <Route path='/add'>{withTransition(AddContainer)}</Route>
        <Route path='/statistics/journal'>{withTransition(Journal)}</Route>
        <Route path='/statistics/reports'>{withTransition(Reports)}</Route>
        <Route path='/budget/planning'>{withTransition(PlanningContainer)}</Route>
        <Route path='/budget/limits'>{withTransition(LimitsContainer)}</Route>
      <ModalBillContainer />
     
    </div>
  )
}

export default withRouter(App)