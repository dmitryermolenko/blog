import { createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./reducers/rootReducer";

const configureStore = (initialState) => {
  return createStore(rootReducer, initialState, composeWithDevTools());
};

const store = configureStore();

export default store;
