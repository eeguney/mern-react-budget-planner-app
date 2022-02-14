import { useState } from "react";
import { useSelector } from "react-redux";
import {
  addExpenseItem,
  toggleExpense,
} from "../../../store/actions/addExpense";

export const ExpenseName = ({ prop }) => {
  const recordState = useSelector((state) => state.record);
  const { label, dispatch, selector, error, seterror } = prop;
  const [searchTerm, setSearchTerm] = useState("");

  // category select handler

  const categoryHandler = (e) => {
    dispatch(
      addExpenseItem("expense", {
        ...selector.expense,
        category: e.currentTarget.getAttribute("label"),
      })
    );
  };
  return (
    <div className="addExpenseItem">
      <label>{label}</label>
      <div className={`__inner ${error && "anError"}`}>
        <div className="expense-category-selector">
          <button
            type="button"
            className="selectedNsearch"
            onClick={() => dispatch(toggleExpense("expCategory"))}
          >
            {selector.expense.category}
          </button>
          <div
            className={`category-list ${
              selector.toggle.expCategory ? "active" : ""
            }`}
          >
            <input
              type="text"
              placeholder="Search category..."
              onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
            />
            {recordState.categories
              .filter((item) =>
                item.name.toLowerCase().match(new RegExp(searchTerm, "g"))
              )
              .map((category, index) => (
                <button
                  key={index}
                  type="button"
                  label={category.name}
                  value={category.name}
                  onClick={categoryHandler}
                >
                  {category.name}
                </button>
              ))}
            {recordState.categories.filter((item) =>
              item.name.toLowerCase().match(new RegExp(searchTerm, "g"))
            ).length < 1 && <p>There are no records...</p>}
          </div>
        </div>
        <input
          type="text"
          className="expense-description"
          name="name"
          placeholder="Type your expense name..."
          value={selector.expense.name}
          onClick={() => seterror({ ...error, expense: false })}
          onChange={(e) =>
            dispatch(
              addExpenseItem("expense", {
                ...selector.expense,
                name: e.currentTarget.value,
              })
            )
          }
        />
      </div>
    </div>
  );
};
