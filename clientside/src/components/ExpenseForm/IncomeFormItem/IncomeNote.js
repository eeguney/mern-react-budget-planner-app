import { addIncomeItem } from "../../../store/actions/addIncome";

export const IncomeNote = ({ prop }) => {
    const { label, selector, dispatch } = prop;
    return (
      <div className="addExpenseItem">
        <label>{label}</label>
        <div className="__inner">
          <textarea className="note" placeholder="Leave a note..." onChange={(e) =>
            dispatch(addIncomeItem("note", e.currentTarget.value))
          } defaultValue={selector.note}></textarea>
        </div>
      </div>
    );
  }