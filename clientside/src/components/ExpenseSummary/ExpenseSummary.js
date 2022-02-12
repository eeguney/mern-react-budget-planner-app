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

  const [rates, setRates] = useState([]);

  useEffect(() => {
    var sumByCategories = [];
    selector.record.expenses.reduce(function (res, value) {
      if (!res[value.category]) {
        res[value.category] = {
          title: value.category,
          value: 0,
          dailyAvg: 0,
          montly: 0,
          weekly: 0,
          color: "black",
        };
        sumByCategories.push(res[value.category]);
      }
      // montly calculate
      // today
      const today = new Date();
      // a month before
      let lastMonthDate = new Date(new Date().setDate(today.getDate() - 30));
      const lastMonthDate_month = lastMonthDate.getUTCMonth() + 1;
      const lastMonthDate_day = lastMonthDate.getUTCDate();
      const lastMonthDate_year = lastMonthDate.getUTCFullYear();
      lastMonthDate =
        lastMonthDate_month +
        "." +
        lastMonthDate_day +
        "." +
        lastMonthDate_year;
      // last 24 hrs
      let lastweek = new Date(new Date().setDate(today.getDate() - 7));
      const lastweek_month = lastweek.getUTCMonth() + 1;
      const lastweek_day = lastweek.getUTCDate();
      const lastweek_year = lastweek.getUTCFullYear();
      lastweek = lastweek_month + "." + lastweek_day + "." + lastweek_year;
      // last 1 month
      // post date
      let postDate = new Date(value.date);
      const postMonth = postDate.getUTCMonth() + 1;
      const postDay = postDate.getUTCDate();
      const postYear = postDate.getUTCFullYear();
      postDate = postMonth + "." + postDay + "." + postYear;
      if (new Date(lastMonthDate) <= new Date(postDate)) {
        res[value.category].montly += value.price.price;
      }
      if (new Date(lastweek) <= new Date(postDate)) {
        res[value.category].weekly += value.price.price;
      }
      res[value.category].value += value.price.price;

      // daily avg
      if (new Date(lastMonthDate) <= new Date(postDate)) {
        const diffTime = Math.abs(new Date(lastMonthDate) - new Date(postDate));
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        const a = (29 - diffDays) * 30;
        const b = a * value.price.price;
        res[value.category].dailyAvg = parseInt(
          (res[value.category].dailyAvg + b) / 30
        );
      }
      return res;
    }, {});

    setRates(sumByCategories);
  }, [selector.record.expenses]);
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
        <BudgetBoard debt={sum.debt} currentMoney={sum.currentMoney} rates={rates} />
        <div className="summary-body">
          <SpendingRates rates={rates} />
          <RecentTransactions />
        </div>
      </div>
    </section>
  );
};

export default ExpenseSummary;
