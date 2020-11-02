import { createStore, applyMiddleware } from "redux";
import { suspenseMiddleware } from "suspense-redux";
import rootReducer from "./reducers";

const createCustomStore = () => createStore(rootReducer, applyMiddleware(suspenseMiddleware));

export default createCustomStore;
