import * as actionType from "../../constants/constants";

const addExpenseItem = (name, form) => async (dispatch) => {
  dispatch({
    type: actionType.ADD_EXPENSE_FORM,
    name: name,
    form: form,
  });
  dispatch({
    type: actionType.EXPENSE_TOGGLE,
    name: name,
  });
};

const toggleExpense = (name) => async (dispatch) => {
    dispatch({
      type: actionType.EXPENSE_TOGGLE,
      name: name,
    });
  };

  const clearForm = () => async (dispatch) => {
    dispatch({
      type: actionType.CLEAR_EXPENSE,
    });
  };

const closeAllSelect = () => async (dispatch) => {
  dispatch({
    type: actionType.CLOSE_ALL_SELECT,
  });
};

export { addExpenseItem, clearForm, closeAllSelect, toggleExpense };
