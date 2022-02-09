import * as actionType from "../../constants/constants";

const initialState = {
  user: null,
  expenses: [],
  funds: [],
  persons: [],
  categories: [],
  sources: [],
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
      console.log(action.data)
      return {
        ...state,
        expenses: [
          ...state.expenses,
          {
            category: action.data.category,
            name: action.data.name,
            price: action.data.price,
            spendingBy: action.data.spendingBy,
            note: action.data.note,
          },
        ],
      };
    case actionType.NEW_INCOME:
      return {
        ...state,
        funds: [
          ...state.funds,
          {
            source: action.data.source,
            price: action.data.price,
            earningBy: action.data.earningBy,
            note: action.data.note,
          },
        ],
      };

    default:
      return state;
  }
};

export default recordReducer;
