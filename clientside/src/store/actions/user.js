import * as actionType from "../../constants/constants";
import * as API from "../../api";
import jwtDecode from "jwt-decode";

const signUp = (form) => async () => {
  try {
    const { data } = await API.signUp(form);
    return data.msg;
  } catch (err) {
    return err.response.data;
  }
};

 const signIn = (data) => async (dispatch) => {
  try {
    dispatch({ type: actionType.SIGNIN, data });
    window.location.reload()
    return data.msg
  } catch (err) {
    return err.response.data
  }
};

const loadUser = () => async (dispatch, getState) => {
  const token = getState().user.token
  const {id} = jwtDecode(token);
  const { data } = await API.fetchAnUser(id);
  const { msg } = data
  const { _id, fullname, email} = msg
  const user = { _id, fullname, email, token }
  if(user) {
    dispatch({
      type: actionType.USER_LOADED,
      user
    })
  }
 };

 const setLogged = () => (dispatch) => {
  dispatch({
    type: actionType.SET_LOGGED
  })
};


export { signUp, signIn, loadUser, setLogged };
