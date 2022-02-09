import { ExpenseDate } from "../ExpenseForm/ExpenseFormItem/ExpenseDate";
import { ExpenseName } from "../ExpenseForm/ExpenseFormItem/ExpenseName";
import { ExpenseNote } from "../ExpenseForm/ExpenseFormItem/ExpenseNote";
import { ExpensePrice } from "../ExpenseForm/ExpenseFormItem/ExpensePrice";
import { SpendingBy } from "../ExpenseForm/ExpenseFormItem/SpendingBy";
import { EarningBy } from "../ExpenseForm/IncomeFormItem/EarningBy";
import { IncomeDate } from "../ExpenseForm/IncomeFormItem/IncomeDate";
import { IncomeEarning } from "../ExpenseForm/IncomeFormItem/IncomeEarning";
import { IncomeNote } from "../ExpenseForm/IncomeFormItem/IncomeNote";
import { IncomeSource } from "../ExpenseForm/IncomeFormItem/IncomeSource";
import Button from "./Buttons";
import "./Form.scss";
import { SignInput } from "./Input/Input";

const Form = {
  Form: ({ children, submit, ...props }) => {
    return (
      <form onSubmit={submit} spellCheck="false" autoComplete="off" {...props}>
        {children}
      </form>
    );
  },
  // expense form
  ExpenseName: (props) => {
    return <ExpenseName prop={props} />
  },
  ExpensePrice: (props) => {
    return <ExpensePrice prop={props} />
  },
  SpendingBy: (props) => {
    return <SpendingBy prop={props} />
  },
  Date: (props) => {
    return <ExpenseDate prop={props} />
  },
  Note: (props) => {
    return <ExpenseNote prop={props} />
  },
  Submit: ({ label, onClick, style, ...prop }) => {
    return (
      <div className="addExpenseItem">
        <Button.Submit label={label} onClick={onClick} style={style} {...prop} />
      </div>
    );
  },
  // income form
  IncomeSource: (props) => {
    return <IncomeSource prop={props} />
  },
  IncomeEarning: (props) => {
    return <IncomeEarning prop={props} />
  },
  EarningBy: (props) => {
    return <EarningBy prop={props} />
  },
  IncomeDate: (props) => {
    return <IncomeDate prop={props} />
  },
  IncomeNote: (props) => {
    return <IncomeNote prop={props} />
  },
  SignInput: (props) => {
    return <SignInput prop={props} />
  },
  SignButton: (props) => {
    return <Button.SignButton prop={props} />
  },
};

export default Form;
