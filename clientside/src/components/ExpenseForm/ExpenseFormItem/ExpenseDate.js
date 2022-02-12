import {
  addExpenseItem,
  toggleExpense,
} from "../../../store/actions/addExpense";
import Icon from "../../UI/Icons";
import { day, month, year } from "../../../utils/lists"

export const ExpenseDate = ({ prop }) => {
  const { label, dispatch, selector } = prop;
  // date select handler

  const dateToggle = (type) => {
    switch (type) {
      case "day":
        dispatch(toggleExpense("dateDay"));
        break;
      case "month":
        dispatch(toggleExpense("dateMonth"));
        break;
      case "year":
        dispatch(toggleExpense("dateYear"));
        break;
      default:
        break;
    }
  };

  const dateHandler = (e) => {
    dispatch(
      addExpenseItem("date", {
        ...selector.date,
        [e.currentTarget.name]: e.currentTarget.value
      })
    );
  };

 
  return (
    <div className="addExpenseItem">
      <label>{label}</label>
      <div className="__inner">
        <div className="expense-date-selector">
          <div className="_day">
            <button
              type="button"
              className="selectDay"
              onClick={() => dateToggle("day")}
            >
              {selector.date.day}
              <span>
                <Icon.Down size="8" />
              </span>
            </button>
            <div
              className={`date-list ${selector.toggle.dateDay ? "active" : ""}`}
            >
              {
                day.map((item) => (
                  <button type="button" name="day" value={item} onClick={dateHandler}>{item}</button>
                ))
              }
            </div>
          </div>
          <div className="_month">
            <button
              type="button"
              className="selectMonth"
              onClick={() => dateToggle("month")}
            >
              {selector.date.month}
              <span>
                <Icon.Down size="8" />
              </span>
            </button>
            <div
              className={`date-list ${
                selector.toggle.dateMonth ? "active" : ""
              }`}
            >
              {
                month.map((item) => (
                  <button type="button" name="month" value={item.value} label={item.label} onClick={dateHandler}>{item.label}</button>
                ))
              }
            </div>
          </div>
          <div className="_year">
            <button
              type="button"
              className="selectYear"
              onClick={() => dateToggle("year")}
            >
              {selector.date.year}
              <span>
                <Icon.Down size="8" />
              </span>
            </button>
            <div
              className={`date-list ${selector.toggle.dateYear ? "active" : ""}`}
            >
              {
                year.map((item) => (
                  <button type="button" name="year" value={item} onClick={dateHandler}>{item}</button>
                ))
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
