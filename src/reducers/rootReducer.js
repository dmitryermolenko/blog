import { combineReducers } from "redux";
import setUserReducer from "../reducers/setUserReducer";
import setArticlesReducer from "../reducers/setArticlesReducer";

const rootReducer = combineReducers({
  userData: setUserReducer,
  articlesData: setArticlesReducer,
});

export default rootReducer;
