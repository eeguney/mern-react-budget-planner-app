import React, { useState, useEffect, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { loadUser } from "./store/actions/user";
import { loadData } from "./store/actions/record";
import Page from "./pages";

const App = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [displayLocation, setDisplayLocation] = useState(location);
  const [transitionStage, setTransistionStage] = useState("fadeIn");

  useEffect(() => {
    dispatch(loadUser()).then((user) => {
      dispatch(loadData());
    });
  }, []);

  useEffect(() => {
    if (location !== displayLocation) setTransistionStage("fadeOut");
  }, [location]);

  return (
    <div
      className={`app ${transitionStage}`}
      onAnimationEnd={() => {
        if (transitionStage === "fadeOut") {
          setTransistionStage("fadeIn");
          setDisplayLocation(location);
        }
      }}
    >
      <Suspense fallback={<div>Loading...</div>}>
        <Routes location={displayLocation}>
          <Route path="/" exact element={<Page.Home />} />
          <Route
            path="/signin"
            exact
            element={user.fullname ? <Navigate to="/" /> : <Page.SignIn />}
          />
          <Route
            path="/signup"
            exact
            element={user.fullname ? <Navigate to="/" /> : <Page.SignUp />}
          />
          <Route
          path="/logout"
          exact
          element={user.fullname ? <Page.Logout /> : <Navigate to="/" />}
        />
        </Routes>
      </Suspense>
    </div>
  );
};

export default App;
