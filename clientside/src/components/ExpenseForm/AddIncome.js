import { useState, useEffect } from "react";
import { ERROR, SUCCESSFUL } from "../../constants/constants";
import { clearForm, toggleIncome } from "../../store/actions/addIncome";
import { addIncome, loadData } from "../../store/actions/record";
import { loadUser } from "../../store/actions/user";
import Form from "../UI/Form";
import Notification from "../UI/Notification/Notification";
import AddSource from "./IncomeFormItem/AddSource";

const AddIncome = ({ tab, dispatch, selector }) => {

  const [error, seterror] = useState({
    source: false,
    price: false,
    earningBy: false,
    note: false,
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
    const { source, price, earningBy, date, note } = selector;
    console.log(date)
    if (!source) seterror({ ...error, source: true });
    else if (!price.price) seterror({ ...error, price: true });
    else if (!earningBy) seterror({ ...error, earningBy: true });
    else {
      dispatch(clearForm())
      dispatch(addIncome({ source, price, earningBy, date: new Date(`${date.month}/${date.day}/${date.year}`), note }))
      setSuccess(true)
      dispatch(loadUser()).then((user) => {
        dispatch(loadData());
      });
    }
  };

  return (
    <div className={`tab ${tab.moving ? "moving" : "stand"} ${tab.translate === 1 && "shadow-none"}`}>
      <div className="tab-changer-bottom">
        <button type="button" className="_addPerson--btn" onClick={() => dispatch(toggleIncome("addSource"))}>
          Add Source
        </button>
      </div>
      <div className="add-expense-form">
        <Form.Form submit={submit}>
          <Form.IncomeSource label="Source" selected="Food" dispatch={dispatch} selector={selector} error={error.source}
            seterror={seterror} />
          <Form.IncomeEarning label="Price" selected="Food" dispatch={dispatch} selector={selector} error={error.price}
            seterror={seterror} />
          <Form.EarningBy label="Earning By" selected="Food" dispatch={dispatch} selector={selector} error={error.earningBy}
            seterror={seterror} />
          <Form.IncomeDate label="Date" selected="Food" dispatch={dispatch} selector={selector} />
          <Form.IncomeNote label="Note" selected="Food" dispatch={dispatch} selector={selector} />
          <Form.Submit label="ADD" selected="Food" dispatch={dispatch} selector={selector} setSuccess={setSuccess} />
        </Form.Form>
      </div>
      {selector.toggle.addSource && (
        <AddSource dispatch={dispatch} />
      )}
      {success && (
        <Notification type={SUCCESSFUL} label="Successful" text="New fund successfully added..." dispatch={dispatch} />
      )}
      {Object.values(error).some(val => val !== false) && (
        <Notification type={ERROR} label="An input is empty" text="Please fill all inputs on the form..." dispatch={dispatch} />
      )}
    </div>
  );
};

export default AddIncome;
