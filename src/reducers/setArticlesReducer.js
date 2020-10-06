import { SET_ARTICLES } from "../actions/actions";
const initialState = [];

const setArticlesReducer = (state = initialState, { type, articles }) => {
  switch (type) {
    case SET_ARTICLES:
      return articles;
    default:
      return state;
  }
};

export default setArticlesReducer;
