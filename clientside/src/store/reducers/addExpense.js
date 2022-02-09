import * as actionType from "../../constants/constants";

const initialState = {
  expense: { category: "Uncategorized", name: "" },
  price: { currency: "$ American Dolar", price: 0 },
  spendingBy: "Not selected",
  date: {
    day: 1,
    month: "February",
    year: "2022",
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
        price: { currency: "$ American Dolar", price: 0 },
        spendingBy: "Not selected",
        date: {
          day: 1,
          month: "February",
          year: "2022",
        },
        note: "",
      };

    default:
      return state;
  }
};

export default addExpenseReducer;
