import * as actionType from "../../constants/constants";

const initialState = {
  source: "Not selected",
  price: { currency: "$ American Dolar", price: null },
  earningBy: "Not selected",
  date: {
    day: 1,
    month: "February",
    year: "2022",
  },
  note: "",
  toggle: {
    source: false,
    priceCurrency: false,
    dateDay: false,
    dateMonth: false,
    dateYear: false,
    earningBy: false,
    addSource: false,
  },
};
const addIncomeReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.ADD_INCOME_FORM:
      return {
        ...state,
        [action.name]: action.form,
      };
    case actionType.INCOME_TOGGLE:
      return {
        ...state,
        toggle: {
          source: false,
          priceCurrency: false,
          dateDay: false,
          dateMonth: false,
          dateYear: false,
          earningBy: false,
          addSource: false,
          [action.name]: !state.toggle[`${action.name}`],
        },
      };
    case actionType.CLEAR_INCOME:
      return {
        ...state,
        source: "Not selected",
        price: { currency: "$ American Dolar", price: 0 },
        earningBy: "Not selected",
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

export default addIncomeReducer;
