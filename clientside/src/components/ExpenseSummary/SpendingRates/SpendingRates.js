import { useState, useEffect } from "react";
import { PieChart } from "react-minimal-pie-chart";
import { useSelector } from "react-redux";

const SpendingRates = ({ rates }) => {
  const [selected, setSelected] = useState(null);

  rates.sort((x, y) => y.value - x.value);
  return (
    <div className="spending-rates">
      <h3>Spending rates</h3>
      <div className="chart-area">
        <div className="_chart">
          <PieChart
            data={
              rates.length > 0
                ? rates
                : [
                    {
                      title: "sample",
                      value: 50,
                      color: "black",
                      weekly: 0,
                      montly: 0,
                    },
                    {
                      title: "sample 2",
                      value: 50,
                      color: "black",
                      weekly: 0,
                      montly: 0,
                    },
                    {
                      title: "sample 3",
                      value: 50,
                      color: "black",
                      weekly: 0,
                      montly: 0,
                    },
                    {
                      title: "sample 4",
                      value: 50,
                      color: "black",
                      weekly: 0,
                      montly: 0,
                    },
                  ]
            }
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
          {rates.slice(0,4).map((item) => (
            <div className="color-info">
              <div className="colorBox" />
              <label>{item.title}</label>
              <div className="this-month">
                <span>This month:</span> -${item.montly}
              </div>
              <div className="daily-avg">
                <span>This week:</span> -${item.weekly}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SpendingRates;
