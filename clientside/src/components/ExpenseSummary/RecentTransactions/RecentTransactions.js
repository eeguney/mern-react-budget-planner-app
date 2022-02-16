import { useState, useEffect } from "react";
import { Link } from "react-router-dom"
import { useSelector } from "react-redux";
import dateShow from "../../../utils/dateShow";

const RecentTransactions = ({ openModal }) => {
  const expenses = useSelector((state) => state.record.expenses);
  const funds = useSelector((state) => state.record.funds);
  const [list, setList] = useState([]);

  useEffect(() => {
    setList(expenses.concat(funds));
  }, [expenses, funds]);

  const lists = list;
  lists.sort((x, y) => new Date(y.date) - new Date(x.date));

  

  return (
    <div className="recent-transactions">
      <label><h3>Last 3 transactions</h3>
      <Link to="/summary">SEE ALL</Link>
      </label>
      <ul className="_list">
        {lists.slice(0, 3).map((item, index) => {
          const date = Math.ceil(
            Math.abs(new Date(item.date) - new Date()) / (1000 * 60 * 60 * 24)
          );
          return item.source ? (
            <li key={index} className="fund--li" onClick={() => openModal(item._id, "fund")}>
              <span className="item-category">{item.source}</span>
              <span className="item-name">{item.note}{item.note === "" && "No note"}</span>
              <span className="item-spendingBy">{item.earningBy}</span>
              <span className="item-date">{dateShow(date)}</span>
              <span className="item-price">
                <div>${item.price.price}</div>
              </span>
            </li>
          ) : (
            <li key={index} className="expense--li" onClick={() => openModal(item._id, "expense")}>
              <span className="item-category">{item.category}</span>
              <span className="item-name">{item.name}</span>
              <span className="item-spendingBy">{item.spendingBy}</span>
              <span className="item-date">{dateShow(date)}</span>
              <span className="item-price">
                <div>-${item.price.price}</div>
              </span>
            </li>
          );
        })}

        {lists.length < 1 && (
          <p style={{ marginBottom: "15px" }}>There is no records yet...</p>
        )}
      </ul>
    </div>
  );
};

export default RecentTransactions;
