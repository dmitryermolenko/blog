export const SET_USER = "SET_USER";
export const SET_ARTICLES = "SET_ARTICLES";

export const setUser = (payload) => ({
  type: SET_USER,
  user: payload,
});

export const setArticles = (payload) => ({
  type: SET_ARTICLES,
  articles: payload,
});
