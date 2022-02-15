import React from "react";
import Home from "./Home/Home";
import Logout from "./Logout/Logout";
import SignIn from "./SignIn/SignIn";
import SignUp from "./SignIn/SignUp";
import Transactions from "./Transactions/Transactions";

const Page = {
  Home: (props) => {
    return <Home {...props} />
  },
  SignIn: (props) => {
    return <SignIn {...props} />
  },
  SignUp: (props) => {
    return <SignUp {...props} />
  },
  Logout: (props) => {
    return <Logout {...props} />
  },
  Transactions: (props) => {
    return <Transactions {...props} />
  }
};

export default Page;
