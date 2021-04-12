import './App.css';
import 'materialize-css';
import { Redirect, Route, withRouter } from 'react-router';
import Header from './Components/Header/Header';
import Subheader from './Components/Subheader/Subheader';
import Journal from './Components/Journal/Journal';
import Reports from './Components/Reports/Reports';
import AddContainer from './Components/Add/AddContainer';
import ModalBillContainer from './Components/ModalBill/ModalBillContainer';
import PlanningContainer from './Components/Planning/PlanningContainer';
import LimitsContainer from './Components/Limits/LimitsContainer';


const App = ({ location, modalMode}) => {
  return (
    <div className='app'>
      <Header location={location} />
      <Subheader/>
      <Route path='/'><Redirect to='/add'/></Route>
      <Route path='/add' component={AddContainer} />
      <Route path='/statistics/journal' component={Journal}/>
      <Route path='/statistics/reports' component={Reports}/>
      <Route path='/budget/planning' component={PlanningContainer} />
      <Route path='/budget/limits' component={LimitsContainer} />
      {
        modalMode && <ModalBillContainer />
      }
    </div>
  )
}

export default withRouter(App)