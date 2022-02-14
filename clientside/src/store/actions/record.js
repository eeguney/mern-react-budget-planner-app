import * as actionType from "../../constants/constants";
import * as API from "../../api";
import jwtDecode from "jwt-decode";

const loadData = () => async (dispatch, getState) => {
  const token = getState().user.token;
  const { id } = jwtDecode(token);
  const { data } = await API.fetchData(id);
  const { msg } = data;
  if (msg) {
    dispatch({
      type: actionType.DATA_LOADED,
      data: msg,
    });
  }
};

const addExpense = (newExpense) => async (dispatch, getState) => {
  const token = getState().user.token;
  const { id } = jwtDecode(token);
  const { data } = await API.addToRecord(id, { expenses: newExpense });
  const { msg } = data;
  if (msg) {
    dispatch({
      type: actionType.NEW_EXPENSE,
      data: newExpense,
    });
    dispatch({
      type: actionType.BOARD_CHANGE_EXPENSE,
      data: newExpense.price.price,
    });
    setTimeout(() => {
      dispatch({
        type: actionType.BOARD_CHANGE_EXPENSE,
        data: 0,
      });
    }, 3500);
    loadData();
  }
};

const addIncome = (newIncome) => async (dispatch, getState) => {
  const token = getState().user.token;
  const { id } = jwtDecode(token);
  const { data } = await API.addToRecord(id, { funds: newIncome });
  const { msg } = data;
  if (msg) {
    dispatch({
      type: actionType.NEW_INCOME,
      data: newIncome,
    });
    dispatch({
      type: actionType.BOARD_CHANGE_FUNDS,
      data: newIncome.price.price,
    });
    setTimeout(() => {
      dispatch({
        type: actionType.BOARD_CHANGE_FUNDS,
        data: 0,
      });
    }, 3500);
    loadData();
  }
};

const deleteFund = (id) => async (dispatch) => {
  const { data } = await API.deleteFund(id);
  const { msg, array } = data;
  if (msg) {
    dispatch({
      type: actionType.DELETE_FUND,
      data: array,
    });
    return true;
  }
  return false;
};

const deleteExpense = (id) => async (dispatch) => {
  const { data } = await API.deleteExpense(id);
  const { msg, array } = data;
  if (msg) {
    dispatch({
      type: actionType.DELETE_EXPENSE,
      data: array,
    });
    return true;
  }
  return false;
};

const addPerson = (newPerson) => async (dispatch, getState) => {
  const token = getState().user.token;
  const { id } = jwtDecode(token);
  const { data } = await API.addToRecord(id, { persons: { name: newPerson } });
  const { msg } = data;
  if (msg) {
    dispatch({
      type: actionType.NEW_PERSON,
      data: newPerson,
    });
    return true;
  }
  return false;
};

const addCategory = (newCategory) => async (dispatch, getState) => {
  const token = getState().user.token;
  const { id } = jwtDecode(token);
  const { data } = await API.addToRecord(id, {
    categories: { name: newCategory },
  });
  const { msg } = data;
  if (msg) {
    dispatch({
      type: actionType.NEW_CATEGORY,
      data: newCategory,
    });
    return true;
  }
  return false;
};

const addSource = (newSource) => async (dispatch, getState) => {
  const token = getState().user.token;
  const { id } = jwtDecode(token);
  const { data } = await API.addToRecord(id, { sources: { name: newSource } });
  const { msg } = data;
  if (msg) {
    dispatch({
      type: actionType.NEW_SOURCE,
      data: newSource,
    });
    return true;
  }
  return false;
};

export {
  loadData,
  addPerson,
  addCategory,
  addSource,
  addExpense,
  addIncome,
  deleteFund,
  deleteExpense,
};
