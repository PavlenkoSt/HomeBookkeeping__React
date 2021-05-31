import './App.css'
import 'materialize-css'
import React, { FC } from 'react'
import { Redirect, Route } from 'react-router'
import Header from './Components/Header/Header'
import Subheader from './Components/Subheader/Subheader'
import Journal from './Components/Journal/Journal'
import Reports from './Components/Reports/Reports'
import Add from './Components/Add/Add'
import ModalBillContainer from './Components/ModalBill/ModalBillContainer'
import PlanningContainer from './Components/Planning/PlanningContainer'
import LimitsContainer from './Components/Limits/LimitsContainer'
import withTransition from './HOC/withTransition'
import Preloader from './Components/common/Preloader/Preloader'

type AppPropsType = {
  load: boolean
}

const App: FC<AppPropsType> = ({ load }) => {
  return (
    <div className='app'>
      <Preloader load={load} />
      {/* @ts-ignore */}
      <Header/>
      <Subheader/>
        <Route path='/'><Redirect to='/add'/></Route>
        <Route path='/add'>{withTransition(Add)}</Route>
        <Route path='/statistics/journal'>{withTransition(Journal)}</Route>
        <Route path='/statistics/reports'>{withTransition(Reports)}</Route>
        <Route path='/budget/planning'>{withTransition(PlanningContainer)}</Route>
        <Route path='/budget/limits'>{withTransition(LimitsContainer)}</Route>
      <ModalBillContainer />
    </div>
  )
}

export default App