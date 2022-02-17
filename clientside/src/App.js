import React, { useEffect, Suspense } from "react";
import { useDispatch } from "react-redux";
import { Routes, Route, Navigate } from "react-router-dom";
import { loadUser } from "./store/actions/user";
import { loadCurrency, loadData } from "./store/actions/record";
import Page from "./pages";
import { currencyApi } from "./api";

const App = () => {
  const dispatch = useDispatch();
  const localCurrency = localStorage.getItem("currency");
  useEffect(() => {
    dispatch(loadUser()).then(() => {
      dispatch(loadData());
    });

    switch (localCurrency) {
      case "Dolar":
        currencyApi("USD").then((currency) => {
          const { TRY, USD, EUR } = currency.data.data;
          dispatch(loadCurrency({ TRY, USD, EUR }));
        });
        break;
      case "Euro":
        currencyApi("EUR").then((currency) => {
          const { TRY, USD, EUR } = currency.data.data;
          dispatch(loadCurrency({ TRY, USD, EUR }));
        });
        break;
      case "TL":
        currencyApi("TRY").then((currency) => {
          const { TRY, USD, EUR } = currency.data.data;
          dispatch(loadCurrency({ TRY, USD, EUR }));
        });
        break;

      default:
        break;
    }
  }, []);

  const login = localStorage.getItem("firstLogin");

  return (
    <div className={`app`}>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" exact element={<Page.Home />} />
          <Route
            path="/signin"
            exact
            element={login ? <Navigate to="/" /> : <Page.SignIn />}
          />
          <Route
            path="/signup"
            exact
            element={login ? <Navigate to="/" /> : <Page.SignUp />}
          />
          <Route
            path="/transactions"
            exact
            element={login ? <Page.Home /> : <Navigate to="/" />}
          />
          <Route
            path="/logout"
            exact
            element={login ? <Page.Logout /> : <Navigate to="/" />}
          />
        </Routes>
      </Suspense>
    </div>
  );
};

export default App;
