import axios from "axios";

const token = localStorage.getItem("token");

const APIwHeader = axios.create({
  baseURL: "http://localhost:5000/api/",
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    token: `Bearer ${token}`,
  },
});

const API = axios.create({
  baseURL: "http://localhost:5000/api/",
  withCredentials: false,
});

export const signUp = (form) => API.post("/user/signup", form);
export const newRecord = (form) => API.post("/data/newrecord", form);
export const addToRecord = (id, form) =>
  APIwHeader.put("/data/addtorecord/" + id, form);
export const deleteFund = (id) => APIwHeader.delete("/data/deletefund/" + id);
export const deleteExpense = (id) =>
  APIwHeader.delete("/data/deleteexpense/" + id);
export const signIn = (form) => API.post("/user/signin", form);
export const fetchAnUser = (id) => APIwHeader.get("/user/" + id, id);
export const fetchData = (id) => APIwHeader.get("/data/" + id, id);

export const currencyApi = (CURRENCY) =>
  axios.get(
    "https://freecurrencyapi.net/api/v2/latest?apikey=315ec9a0-8f21-11ec-af69-bdef3d18c0ec&base_currency="+CURRENCY
  );
