import { combineReducers } from "redux";
import user from "./user"
import addExpense from "./addExpense"
import addIncome from "./addIncome"
import record from "./record"
export const reducers = combineReducers({ addExpense, addIncome, user, record })