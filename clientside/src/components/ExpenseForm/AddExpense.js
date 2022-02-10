import { useState, useEffect } from "react";
import { ERROR, SUCCESSFUL } from "../../constants/constants";
import { clearForm, toggleExpense } from "../../store/actions/addExpense";
import { addExpense } from "../../store/actions/record";
import Form from "../UI/Form";
import Notification from "../UI/Notification/Notification";
import AddCategory from "./ExpenseFormItem/AddCategory";
import AddPerson from "./ExpenseFormItem/AddPerson";

const AddExpense = ({ dispatch, selector, tab }) => {
  const [error, seterror] = useState({
    expense: false,
    price: false,
    spendingBy: false,
    service: false,
  });

  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if(success) {
      setTimeout(() => {
        setSuccess(false)
      }, 5000);
    }
  }, [success]);
  

  const submit = (event) => {
    event.preventDefault();
    const { expense, price, spendingBy, date, note } = selector;
    if (!expense.name) seterror({ ...error, expense: true });
    else if (!price.price) seterror({ ...error, price: true });
    else if (!spendingBy) seterror({ ...error, spendingBy: true });
    else {
      dispatch(clearForm())
      dispatch(addExpense({ category: expense.category, name: expense.name, price, spendingBy, date: new Date(`${date.day}-${date.month}-${date.year}`), note }))
      setSuccess(true)
    }
  };

  return (
    <div className={`tab ${tab.moving ? "moving" : "stand"}`}>
      <div className="tab-changer-bottom">
        <button
          type="button"
          className="_addPerson--btn"
          onClick={() => dispatch(toggleExpense("addPerson"))}
        >
          Add Person
        </button>
        <button type="button" className="_addCategory--btn" onClick={() => dispatch(toggleExpense("addCategory"))}>
          Add Category
        </button>
      </div>
      <div className="add-expense-form">
        <Form.Form submit={submit}>
          <Form.ExpenseName
            label="Name"
            selected="Food"
            dispatch={dispatch}
            selector={selector}
            error={error.expense}
            seterror={seterror}
          />
          <Form.ExpensePrice
            label="Price"
            selected="Food"
            dispatch={dispatch}
            selector={selector}
            error={error.price}
            seterror={seterror}
          />
          <Form.SpendingBy
            label="Spending by"
            selected="Food"
            dispatch={dispatch}
            selector={selector}
          />
          <Form.Date
            label="Date"
            selected="Food"
            dispatch={dispatch}
            selector={selector}
          />
          <Form.Note
            label="Note"
            selected="Food"
            dispatch={dispatch}
            selector={selector}
          />
          <Form.Submit
            label="ADD"
            selected="Food"
            dispatch={dispatch}
            setSuccess={setSuccess}
            selector={selector}
          />
        </Form.Form>
      </div>
      {/* portals */}
      {selector.toggle.addPerson && (
        <AddPerson dispatch={dispatch} />
      )}
      {selector.toggle.addCategory && (
        <AddCategory dispatch={dispatch} />
      )}
      {success && (
        <Notification type={SUCCESSFUL} label="Successful" text="New expense successfully added..." dispatch={dispatch} />
      )}
      {Object.values(error).some(val => val !== false) && (
        <Notification type={ERROR} label="An input is empty" text="Please fill all inputs on the form..." dispatch={dispatch} />
      )}
    </div>
  );
};

export default AddExpense;
