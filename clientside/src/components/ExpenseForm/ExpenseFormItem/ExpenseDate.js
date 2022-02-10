import {
  addExpenseItem,
  toggleExpense,
} from "../../../store/actions/addExpense";
import Icon from "../../UI/Icons";

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
              <button type="button" name="day" value="1" onClick={dateHandler}>1</button>
              <button type="button" name="day" value="2" onClick={dateHandler}>2</button>
              <button type="button" name="day" value="3" onClick={dateHandler}>3</button>
              <button type="button" name="day" value="4" onClick={dateHandler}>4</button>
              <button type="button" name="day" value="5" onClick={dateHandler}>5</button>
              <button type="button" name="day" value="6" onClick={dateHandler}>6</button>
              <button type="button" name="day" value="7" onClick={dateHandler}>7</button>
              <button type="button" name="day" value="8" onClick={dateHandler}>8</button>
              <button type="button" name="day" value="9" onClick={dateHandler}>9</button>
              <button type="button" name="day" value="10" onClick={dateHandler}>10</button>
              <button type="button" name="day" value="11" onClick={dateHandler}>11</button>
              <button type="button" name="day" value="12" onClick={dateHandler}>12</button>
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
              <button type="button" name="month" value="1" label="January" onClick={dateHandler}>January</button>
              <button type="button" name="month" value="2" label="February" onClick={dateHandler}>February</button>
              <button type="button" name="month" value="3" label="March" onClick={dateHandler}>March</button>
              <button type="button" name="month" value="4" label="April" onClick={dateHandler}>April</button>
              <button type="button" name="month" value="5" label="May" onClick={dateHandler}>May</button>
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
              <button type="button" name="year" value="2022" onClick={dateHandler}>2022</button>
              <button type="button" name="year" value="2021" onClick={dateHandler}>2021</button>
              <button type="button" name="year" value="2020" onClick={dateHandler}>2020</button>
              <button type="button" name="year" value="2019" onClick={dateHandler}>2019</button>
              <button type="button" name="year" value="2018" onClick={dateHandler}>2018</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
