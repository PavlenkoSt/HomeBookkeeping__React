import './App.css';
import "typeface-roboto";
import Header from './Components/Header/Header';
import { withRouter } from 'react-router';
import { compose } from 'redux';
import Subheader from './Components/Subheader/Subheader';


const App = ({ location }) => {
  return (
    <div className='app'>
      <Header location={location} />
      <Subheader/>
    </div>
  )
}

export default compose(
  withRouter
)(App);
