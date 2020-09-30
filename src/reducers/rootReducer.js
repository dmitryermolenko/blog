import { combineReducers } from "redux";
import setUserReducer from "../reducers/setUserReducer";

const rootReducer = combineReducers({
  userData: setUserReducer,
});

export default rootReducer;
