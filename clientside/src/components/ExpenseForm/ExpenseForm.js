import { useState } from "react";
import AddExpense from "./AddExpense";
import AddIncome from "./AddIncome";
import Tabs from "./Tabs";
import "./ExpenseForm.scss";
import { useDispatch, useSelector } from "react-redux";

const ExpenseForm = () => {
  const dispatch = useDispatch();
  const expense = useSelector((state) => state.addExpense);
  const income = useSelector((state) => state.addIncome);
  const [tab, settab] = useState({ translate: 1, moving: false });

  const tabHandler = (order) => {
    settab({ translate: order, moving: true });
    setTimeout(() => {
      settab({ translate: order, moving: false });
    }, 100);
  };

  return (
    <section className="expenseForm">
      <Tabs tabHandler={tabHandler} tab={tab}>
        <AddExpense
          dispatch={dispatch}
          selector={expense}
          tab={tab}
        />
        <AddIncome dispatch={dispatch} selector={income} tab={tab} />
      </Tabs>
    </section>
  );
};

export default ExpenseForm;
