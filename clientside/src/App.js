import React, { useEffect, Suspense } from "react";
import { useDispatch } from "react-redux";
import { Routes, Route, Navigate } from "react-router-dom";
import { loadUser } from "./store/actions/user";
import { loadData } from "./store/actions/record";
import Page from "./pages";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser()).then(() => {
      dispatch(loadData());
    });
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
