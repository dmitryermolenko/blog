export const SET_USER = "SET_USER";

const setUser = (payload) => ({
  type: SET_USER,
  user: payload,
});

export default setUser;
