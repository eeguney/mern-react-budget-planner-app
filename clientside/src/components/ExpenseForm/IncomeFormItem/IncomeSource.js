import { useState } from "react";
import { useSelector } from "react-redux";
import { addIncomeItem, toggleIncome } from "../../../store/actions/addIncome";

export const IncomeSource = ({ prop }) => {
  const recordState = useSelector((state) => state.record);
  const { label, dispatch, selector } = prop;
  const [searchTerm, setSearchTerm] = useState("");

  // income source select handler
  const incomeSourceHandler = (e) => {
    dispatch(addIncomeItem("source", e.currentTarget.getAttribute("label")));
  };
  return (
    <div className="addIncomeItem">
      <label>{label}</label>
      <div className="__inner">
        <div className="income-source-selector">
          <button
            type="button"
            className="selectSource"
            onClick={() => dispatch(toggleIncome("source"))}
          >
            {selector.source}
          </button>
          <div
            className={`source-list ${selector.toggle.source ? "active" : ""}`}
          >
            <input
              type="text"
              placeholder="Search person..."
              onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
            />
            {recordState.sources
              .filter((item) =>
                item.name.toLowerCase().match(new RegExp(searchTerm, "g"))
              )
              .map((source, index) => (
                <button
                  key={index}
                  type="button"
                  label={source.name}
                  onClick={incomeSourceHandler}
                >
                  {source.name}
                </button>
              ))}
            {recordState.sources.filter((item) =>
              item.name.toLowerCase().match(new RegExp(searchTerm, "g"))
            ).length < 1 && <p>There are no records...</p>}
          </div>
        </div>
      </div>
    </div>
  );
};
