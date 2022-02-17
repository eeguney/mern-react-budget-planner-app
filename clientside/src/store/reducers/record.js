import * as actionType from "../../constants/constants";

const initialState = {
  user: null,
  expenses: [],
  funds: [],
  persons: [],
  categories: [],
  sources: [],
  changes: { expense: 0, fund: 0 },
  currency: []
};

const recordReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.DATA_LOADED:
      return {
        ...state,
        user: action.data.user,
        expenses: action.data.expenses,
        funds: action.data.funds,
        persons: action.data.persons,
        categories: action.data.categories,
        sources: action.data.sources,
      };
      case actionType.CURRENCY_LOAD:
      return {
        ...state,
        currency: action.data,
      };
      
    case actionType.NEW_PERSON:
      return {
        ...state,
        persons: [...state.persons, { name: action.data, _id: "" }],
      };
    case actionType.NEW_CATEGORY:
      return {
        ...state,
        categories: [...state.categories, { name: action.data, _id: "" }],
      };
    case actionType.NEW_SOURCE:
      return {
        ...state,
        sources: [...state.sources, { name: action.data, _id: "" }],
      };
    case actionType.NEW_EXPENSE:
      return {
        ...state,
        expenses: [
          ...state.expenses,
          {
            category: action.data.category,
            name: action.data.name,
            price: {
              currency: action.data.price.currency,
              price: Number(action.data.price.price),
            },
            date: action.data.date,
            spendingBy: action.data.spendingBy,
            note: action.data.note,
            _id: action.data._id,
          },
        ],
      };
    case actionType.BOARD_CHANGE_EXPENSE:
      return {
        ...state,
        changes: { ...state.changes, expense: action.data },
      };
    case actionType.NEW_INCOME:
      return {
        ...state,
        funds: [
          ...state.funds,
          {
            source: action.data.source,
            price: {
              currency: action.data.price.currency,
              price: Number(action.data.price.price),
            },
            date: action.data.date,
            earningBy: action.data.earningBy,
            note: action.data.note,
            _id: action.data._id,
          },
        ],
      };
    case actionType.DELETE_FUND:
      return {
        ...state,
        funds: action.data,
      };

    case actionType.DELETE_EXPENSE:
      return {
        ...state,
        expenses: action.data,
      };

    case actionType.BOARD_CHANGE_FUNDS:
      return {
        ...state,
        changes: { ...state.changes, fund: action.data },
      };
    default:
      return state;
  }
};

export default recordReducer;
