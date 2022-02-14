import { useState } from "react";
import { useSelector } from "react-redux";
import { addIncomeItem, toggleIncome } from "../../../store/actions/addIncome";

export const EarningBy = ({ prop }) => {
  const recordState = useSelector((state) => state.record);
  const { label, dispatch, selector } = prop;
  const [searchTerm, setSearchTerm] = useState("");

  // earning by select handler
  const earningByHandler = (e) => {
    dispatch(addIncomeItem("earningBy", e.currentTarget.value));
  };
  return (
    <div className="addIncomeItem">
      <label>{label}</label>
      <div className="__inner">
        <div className="income-source-selector">
          <button
            type="button"
            className="selectSource"
            onClick={() => dispatch(toggleIncome("earningBy"))}
          >
            {selector.earningBy}
          </button>
          <div
            className={`source-list ${
              selector.toggle.earningBy ? "active" : ""
            }`}
          >
            <input type="text" placeholder="Search person..." onChange={(e) => setSearchTerm(e.target.value.toLowerCase())} />
            {recordState.persons.filter((item) => item.name.toLowerCase().match(new RegExp(searchTerm, 'g'))).map((person, index) => (
              <button
              key={index}
                type="button"
                value={person.name}
                onClick={earningByHandler}
              >
                {person.name}
              </button>
            ))}
            {recordState.persons.filter((item) => item.name.toLowerCase().match(new RegExp(searchTerm, 'g'))).length < 1 &&  <p>There are no records...</p>}
          </div>
        </div>
      </div>
    </div>
  );
};
