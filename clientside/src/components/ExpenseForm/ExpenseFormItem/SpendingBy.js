import { useState } from "react"
import { useSelector } from "react-redux";
import { addExpenseItem, toggleExpense } from "../../../store/actions/addExpense";

export const SpendingBy = ({ prop }) => {
  const recordState = useSelector((state) => state.record);
  const { label, dispatch, selector } = prop;
  const [searchTerm, setSearchTerm] = useState("");

  // spendingBy select handler
  const spendingByHandler = (e) => {
    dispatch(addExpenseItem("spendingBy", e.currentTarget.getAttribute("label")));
  };
  return (
    <div className="addExpenseItem">
      <label>{label}</label>
      <div className={`__inner`}>
        <div className="expense-person-selector">
          <button
            type="button"
            className="selectPerson"
            onClick={() => dispatch(toggleExpense("spendingBy"))}
          >
            {selector.spendingBy}
          </button>
          <div
            className={`person-list ${
              selector.toggle.spendingBy ? "active" : ""
            }`}
          >
            <input type="text" placeholder="Search person..." onChange={(e) => setSearchTerm(e.target.value.toLowerCase())} />
            { recordState.persons.filter((item) => item.name.toLowerCase().match(new RegExp(searchTerm, 'g'))).map((person) => (
              <button type="button" label={person.name} value={person.name} onClick={spendingByHandler}>
              {person.name}
            </button>
            )) }
            {recordState.persons.filter((item) => item.name.toLowerCase().match(new RegExp(searchTerm, 'g'))).length < 1 &&  <p>There are no records...</p>}
          </div>
        </div>
      </div>
    </div>
  );
};
