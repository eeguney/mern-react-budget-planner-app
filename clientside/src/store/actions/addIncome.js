import * as actionType from "../../constants/constants";

const addIncomeItem = (name, form) => async (dispatch) => {
  dispatch({
    type: actionType.ADD_INCOME_FORM,
    name: name,
    form: form,
  });
  dispatch({
    type: actionType.INCOME_TOGGLE,
    name: name,
  });
};

const toggleIncome = (name) => async (dispatch) => {
    dispatch({
      type: actionType.INCOME_TOGGLE,
      name: name,
    });
  };

  const clearForm = () => async (dispatch) => {
    dispatch({
      type: actionType.CLEAR_INCOME,
    });
  };

const closeAllSelect = () => async (dispatch) => {
  dispatch({
    type: actionType.CLOSE_ALL_SELECT,
  });
};

export { addIncomeItem, clearForm, closeAllSelect, toggleIncome };
