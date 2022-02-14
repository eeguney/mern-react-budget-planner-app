import * as actionType from "../../constants/constants";
import moment from "moment";

const date = moment().format("l").split("/");

const initialState = {
  source: "Not selected",
  price: { currency: "Dolar", price: null },
  earningBy: "Not selected",
  date: {
    day: date[1],
    month: date[0],
    year: date[2],
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

export default addIncomeReducer;
