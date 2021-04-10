import { combineReducers, compose, createStore } from "redux";
import { reducer as formReducer } from 'redux-form'
import billReducer from './billReducer';
import headerReducer from './headerReducer';
import chartReducer from './chartReducer';

const reducers = combineReducers({
    header: headerReducer,
    bill: billReducer,
    chart: chartReducer,
    form: formReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers())

export default store