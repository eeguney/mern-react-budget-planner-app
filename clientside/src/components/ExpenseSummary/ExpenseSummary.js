import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import "./ExpenseSummary.scss";
import BudgetBoard from "./BudgetBoard/BudgetBoard";
import SpendingRates from "./SpendingRates/SpendingRates";
import RecentTransactions from "./RecentTransactions/RecentTransactions";

const ExpenseSummary = ({ openModal }) => {
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
        switch (value.price.currency) {
          case "Dolar":
            res[value.category].montly = res[value.category].montly + (value.price.price / selector.record.currency.USD);
            break;
          case "Euro":
            res[value.category].montly = res[value.category].montly + (value.price.price / selector.record.currency.EUR);
            break;
          case "TL":
            res[value.category].montly = res[value.category].montly + (value.price.price / selector.record.currency.TRY);

            break;
          default:
            return 0;
        }
      }
      if (new Date(lastweek) <= new Date(postDate)) {
        switch (value.price.currency) {
          case "Dolar":
            res[value.category].weekly = res[value.category].weekly + (value.price.price / selector.record.currency.USD);
            break;
          case "Euro":
            res[value.category].weekly = res[value.category].weekly + (value.price.price / selector.record.currency.EUR);
            break;
          case "TL":
            res[value.category].weekly = res[value.category].weekly + (value.price.price / selector.record.currency.TRY);
            break;
          default:
            return 0;
        }
      }
      switch (value.price.currency) {
        case "Dolar":
          res[value.category].value =+value.price.price / selector.record.currency.USD;
          break;
        case "Euro":
          res[value.category].value =+value.price.price / selector.record.currency.EUR;
          break;
        case "TL":
          res[value.category].value =+value.price.price / selector.record.currency.TRY;
          break;
        default:
          return 0;
      }
      // daily avg
      if (new Date(lastMonthDate) <= new Date(postDate)) {
       
        const diffTime = Math.abs(new Date(postDate) - new Date(lastMonthDate));
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        const a = (30 - diffDays) * 30;
        let b = 0;
        switch (value.price.currency) {
          case "Dolar":
            b = (a * value.price.price) / selector.record.currency.USD;
            break;
          case "Euro":
            b = (a * value.price.price) / selector.record.currency.EUR;
            break;
          case "TL":
            b = (a * value.price.price) / selector.record.currency.TRY;
            break;
          default:
            return 0;
        }
        res[value.category].dailyAvg = 
          (res[value.category].dailyAvg + b)
        
      }
      return res;
    }, {});

    setRates(sumByCategories);
  }, [selector.record.expenses]);

  useEffect(() => {
    // calculation current money and debt
    // sum all funds
    let fundPrice = selector.record.funds
      .map((item) => {
        switch (item.price.currency) {
          case "Dolar":
            return item.price.price / selector.record.currency.USD;
          case "Euro":
            return item.price.price / selector.record.currency.EUR;
          case "TL":
            return item.price.price / selector.record.currency.TRY;
          default:
            return 0;
        }
      })
      .reduce((prev, curr) => prev + curr, 0);
    // sum all expenses
    let expensePrice = selector.record.expenses
      .map((item) => {
        switch (item.price.currency) {
          case "Dolar":
            return item.price.price / selector.record.currency.USD;
          case "Euro":
            return item.price.price / selector.record.currency.EUR;
          case "TL":
            return item.price.price / selector.record.currency.TRY;
          default:
            return 0;
        }
      })
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
        <BudgetBoard
          debt={sum.debt}
          currentMoney={sum.currentMoney}
          rates={rates}
        />
        <div className="summary-body">
          <SpendingRates rates={rates} />
          <RecentTransactions openModal={openModal} />
        </div>
      </div>
    </section>
  );
};

export default ExpenseSummary;
