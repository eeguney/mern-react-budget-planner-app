import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { PieChart } from "react-minimal-pie-chart";
import "./ExpenseSummary.scss";

const ExpenseSummary = () => {
  const [selected, setSelected] = useState(null);
  const [sum, setSum] = useState({
    funds: 0,
    expenses: 0,
    currentMoney: 0,
    debt: 0,
  });
  const selector = useSelector((state) => state);

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
    let currentMoney = fundPrice - expensePrice;

    setSum({
      ...sum,
      funds: fundPrice,
      expenses: expensePrice,
    });
    
    if (currentMoney < 0) {
      debt = currentMoney;
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
        <div className="summary-top">
          <div className="budget-board">
            <div className="_current-money">
              <label>Current money</label>${sum.currentMoney}
              <span>Daily change: -12$</span>
            </div>
            <div className="_debt">
              <label>Debt</label>${sum.debt}
              <span>Daily change: -19$</span>
            </div>
          </div>
        </div>
        <div className="summary-body">
          <div className="spending-rates">
            <h3>Spending rates</h3>
            <div className="chart-area">
              <div className="_chart">
                <PieChart
                  data={[
                    { title: "One", value: 10, color: "#643df2" },
                    { title: "Two", value: 15, color: "#1bf2a3" },
                    { title: "Three", value: 20, color: "#ff3131" },
                    { title: "Four", value: 40, color: "#00cd35" },
                  ]}
                  lineWidth={20}
                  paddingAngle={18}
                  rounded
                  viewBoxSize={[110, 110]}
                  center={[55, 55]}
                  labelPosition={60}
                  label={({ x, y, dx, dy, dataEntry }) => (
                    <text
                      x={x}
                      y={y}
                      dx={dx}
                      dy={dy}
                      dominantBaseline="central"
                      textAnchor="middle"
                      style={{
                        fontSize: "8px",
                        userSelect: "none",
                        fontWeight: 700,
                        color: "#fff",
                      }}
                    >
                      {Math.round(dataEntry.percentage) + "%"}
                    </text>
                  )}
                  labelStyle={{
                    fontSize: "10px",
                    fontFamily: "sans-serif",
                    color: "#fff",
                  }}
                  segmentsStyle={{
                    transition: "stroke .3s",
                    cursor: "pointer",
                  }}
                  segmentsShift={(index) => (index === selected ? 5 : 1)}
                  onClick={(_, index) => {
                    setSelected(index === selected ? undefined : index);
                  }}
                  animate
                />
              </div>
              <div className="chart-info-area">
                <div className="color-info">
                  <div className="colorBox" />
                  <label> Tax</label>
                  <div className="this-month">
                    <span>This month:</span> -$512
                  </div>
                  <div className="daily-avg">
                    <span>Daily average:</span> -$45
                  </div>
                </div>
                <div className="color-info">
                  <div className="colorBox" />
                  <label> Food</label>
                  <div className="this-month">
                    <span>This month:</span> -$512
                  </div>
                  <div className="daily-avg">
                    <span>Daily average:</span> -$45
                  </div>
                </div>
                <div className="color-info">
                  <div className="colorBox" />
                  <label> Car</label>
                  <div className="this-month">
                    <span>This month:</span> -$512
                  </div>
                  <div className="daily-avg">
                    <span>Daily average:</span> -$45
                  </div>
                </div>
                <div className="color-info">
                  <div className="colorBox" />
                  <label> Dress</label>
                  <div className="this-month">
                    <span>This month:</span> -$512
                  </div>
                  <div className="daily-avg">
                    <span>Daily average:</span> -$45
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="recent-transactions">
            <h3>Last 5 transactions</h3>
            <ul className="_list">
              <li className="expense--li">
                <span className="item-category">Food</span>
                <span className="item-name">Magnum Ice Cream</span>
                <span className="item-spendingBy">Hillary</span>
                <span className="item-date">Today</span>
                <span className="item-price">
                  <div>-$2.2</div>
                </span>
              </li>
              <li className="fund--li">
                <span className="item-category">Wage</span>
                <span className="item-name">Wage from my work</span>
                <span className="item-spendingBy">John</span>
                <span className="item-date">3 days</span>
                <span className="item-price">
                  <div>$620</div>
                </span>
              </li>
              <li className="expense--li">
                <span className="item-category">Food</span>
                <span className="item-name">Magnum Ice Cream</span>
                <span className="item-spendingBy">Hillary</span>
                <span className="item-date">Today</span>
                <span className="item-price">
                  <div>-$2.2</div>
                </span>
              </li>
              <li className="fund--li">
                <span className="item-category">Wage</span>
                <span className="item-name">Wage from my work</span>
                <span className="item-spendingBy">John</span>
                <span className="item-date">3 days</span>
                <span className="item-price">
                  <div>$620</div>
                </span>
              </li>
              <li className="fund--li">
                <span className="item-category">Wage</span>
                <span className="item-name">Wage from my work</span>
                <span className="item-spendingBy">John</span>
                <span className="item-date">3 days</span>
                <span className="item-price">
                  <div>$62520</div>
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExpenseSummary;
