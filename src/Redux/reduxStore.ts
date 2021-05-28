import { combineReducers, compose, createStore } from "redux"
import { reducer as formReducer } from 'redux-form'
import billReducer from './billReducer'
import headerReducer from './headerReducer'
import chartReducer from './chartReducer'
import budgetReducer from "./budgetReducer"

const reducers = combineReducers({
    header: headerReducer,
    bill: billReducer,
    chart: chartReducer,
    budget: budgetReducer,
    form: formReducer
})

type RootReducerType = typeof reducers
export type AppStateType = ReturnType<RootReducerType>

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers())

export default store