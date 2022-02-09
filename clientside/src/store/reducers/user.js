import * as actionType from "../../constants/constants";

const initialState = {
  token: sessionStorage.getItem("token"),
  _id: null,
  fullname: null,
  email: null,
  isLogged: false
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.SIGNIN:
      sessionStorage.setItem("token", action.data.accessToken);
      window.setTimeout(() => {
        sessionStorage.removeItem("token");
    }, 3 * 24 * 60 * 60 * 60);
      return {
        _id: action.data._id,
        fullname: action.data.full,
        email: action.data.email,
        token: JSON.stringify({ ...action?.data }),
        isLogged: true,
      };
      case actionType.USER_LOADED:
      return {
        ...state,
        _id: action.user._id,
        token: action.user.token,
        fullname: action.user.fullname,
        email: action.user.email,
        isLogged: true,
      };
      case actionType.SET_LOGGED:
      return {
        ...state,
        isLogged: true,
      };
    default:
      return state;
  }
};

export default userReducer;
