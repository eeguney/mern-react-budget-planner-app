import { useState, useEffect } from "react";
import { PieChart } from "react-minimal-pie-chart";
import { useSelector } from "react-redux";

const SpendingRates = () => {
  const expenses = useSelector((state) => state.record.expenses);
  const [selected, setSelected] = useState(null);
  const [sum, setSum] = useState();

  useEffect(() => {
    var sumByCategories  = [];
    expenses.reduce(function (res, value) {
      if (!res[value.category]) {
        res[value.category] = { title: value.category, value: 0, color: "black" };
        sumByCategories .push(res[value.category]);
      }
      res[value.category].value += value.price.price;
      return res;
    }, {});
    setSum(sumByCategories);

  }, [expenses]);
  return (
    <div className="spending-rates">
      <h3>Spending rates</h3>
      <div className="chart-area">
        <div className="_chart">
          <PieChart
            data={sum}
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
  );
};

export default SpendingRates;
