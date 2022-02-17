import * as actionType from "../../constants/constants";
import moment from "moment";

const date = moment().format("l").split("/");

const initialState = {
  expense: { category: "Uncategorized", name: "" },
  price: { currency: localStorage.getItem("currency"), price: 0 },
  spendingBy: "Not selected",
  date: {
    day: date[1],
    month: date[0],
    year: date[2],
  },
  note: "",
  toggle: {
    expCategory: false,
    priceCurrency: false,
    dateDay: false,
    dateMonth: false,
    dateYear: false,
    spendingBy: false,
    addPerson: false,
    addCategory: false,
  },
};
const addExpenseReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.ADD_EXPENSE_FORM:
      return {
        ...state,
        [action.name]: action.form,
      };
    case actionType.EXPENSE_TOGGLE:
      return {
        ...state,
        toggle: {
          expCategory: false,
          priceCurrency: false,
          dateDay: false,
          dateMonth: false,
          dateYear: false,
          spendingBy: false,
          addPerson: false,
          addCategory: false,
          [action.name]: !state.toggle[`${action.name}`],
        },
      };
    case actionType.CLEAR_EXPENSE:
      return {
        ...state,
        expense: { category: "Uncategorized", name: "" },
        price: { currency: localStorage.getItem("currency"), price: 0 },
        spendingBy: "Not selected",
        date: {
          day: date[1],
          month: date[0],
          year: date[2],
        },
        note: "",
      };

    default:
      return state;
  }
};

export default addExpenseReducer;
