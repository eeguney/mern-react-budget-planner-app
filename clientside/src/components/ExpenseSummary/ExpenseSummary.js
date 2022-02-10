import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import "./ExpenseSummary.scss";
import BudgetBoard from "./BudgetBoard/BudgetBoard";
import SpendingRates from "./SpendingRates/SpendingRates";
import RecentTransactions from "./RecentTransactions/RecentTransactions";

const ExpenseSummary = () => {

  const selector = useSelector((state) => state);

  const [sum, setSum] = useState({
    funds: 0,
    expenses: 0,
    currentMoney: 0,
    debt: 0,
  });

  useEffect(() => {
    // calculation current money and debt
    // sum all funds
    let fundPrice = selector.record.funds
      .map((item) => item.price.price)
      .reduce((prev, curr) => prev + curr, 0);
    // sum all expenses
    let expensePrice = selector.record.expenses
      .map((item) => item.price.price)
      .reduce((prev, curr) => prev + curr, 0);

    let debt = 0;
    let currentMoney = parseInt(fundPrice) - parseInt(expensePrice);

    setSum({
      ...sum,
      funds: fundPrice,
      expenses: expensePrice,
    });

    if (currentMoney <= 0) {
      debt = parseInt(currentMoney);
      currentMoney = 0;
    }

    setSum({
      ...sum,
      currentMoney: currentMoney,
      debt: debt,
    });
  }, [selector.record.funds, selector.record.expenses]);


  return (
    <section className="expenseSummary">
      <div className="summary-container">
        <h2>Summary</h2>
        <BudgetBoard debt={sum.debt} currentMoney={sum.currentMoney} />
        <div className="summary-body">
          <SpendingRates />
          <RecentTransactions />
        </div>
      </div>
    </section>
  );
};

export default ExpenseSummary;
