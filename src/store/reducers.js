import { combineReducers } from "redux";
import { suspenseReducer } from "suspense-redux";
console.log(suspenseReducer);
const rootReducer = combineReducers({
  // ...your other reducers here
  // you have to pass suspenseReducer under 'suspense' key,
  suspense: suspenseReducer,
});

export default rootReducer;
