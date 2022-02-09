import React from "react";
import Drawer from "./Drawer/Drawer";
import ExpenseForm from "./ExpenseForm/ExpenseForm";
import ExpenseSummary from "./ExpenseSummary/ExpenseSummary";
import Welcome from "./Welcome/Welcome";

const Component = {
  Welcome: (props) => {
    return <Welcome {...props} />
  },
  ExpenseForm: (props) => {
    return <ExpenseForm {...props} />
  },
  ExpenseSummary: (props) => {
    return <ExpenseSummary {...props} />
  },
  Drawer: (props) => {
    return <Drawer {...props} />
  }
};

export default Component;
