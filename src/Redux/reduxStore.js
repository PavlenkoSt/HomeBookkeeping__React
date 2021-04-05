import { combineReducers, compose, createStore } from "redux";
import headerReducer from "./headerReducer";

const reducers = combineReducers({
    header: headerReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers())

export default store