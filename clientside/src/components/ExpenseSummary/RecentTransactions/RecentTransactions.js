import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const RecentTransactions = () => {
  const expenses = useSelector((state) => state.record.expenses);
  const funds = useSelector((state) => state.record.funds);
  const [list, setList] = useState([]);

  useEffect(() => {
    setList(expenses.concat(funds));
  }, [expenses, funds]);

  const lists = list;
  lists.sort((x, y) => new Date(x.date) - new Date(y.date));

  return (
    <div className="recent-transactions">
      <h3>Last 3 transactions</h3>
      <ul className="_list">
        {lists.slice(0,3).map((item) => (
          item.source ? 
          <li className="fund--li">
          <span className="item-category">{item.source}</span>
          <span className="item-name">{item.note}k</span>
          <span className="item-spendingBy">{item.earningBy}</span>
          <span className="item-date">3 days</span>
          <span className="item-price">
            <div>${item.price.price}</div>
          </span>
        </li>
          :
          <li className="expense--li">
            <span className="item-category">{item.category}</span>
            <span className="item-name">{item.name}</span>
            <span className="item-spendingBy">{item.spendingBy}</span>
            <span className="item-date">Today</span>
            <span className="item-price">
              <div>-${item.price.price}</div>
            </span>
          </li>
        ))}
       
      </ul>
    </div>
  );
};

export default RecentTransactions;
