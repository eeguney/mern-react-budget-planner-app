import { addExpenseItem, toggleExpense } from "../../../store/actions/addExpense";

export const ExpensePrice = ({ prop }) => {
  const { label,  dispatch, selector, error, seterror } = prop;
  // price handler

  const priceHandler = (e) => {
    dispatch(
      addExpenseItem("price", {
        ...selector.price,
          currency: e.target.getAttribute("label")
      })
    );
  };
  return (
    <div className="addExpenseItem">
      <label>{label}</label>
      <div className={`__inner ${error && "anError"}`}>
        <div className="expense-currency-selector">
          <button type="button" className="selectCurrency" onClick={() => dispatch(toggleExpense("priceCurrency"))}>
          {selector.price.currency}
          </button>
          <div className={`currency-list  ${
                selector.toggle.priceCurrency ? "active" : ""
              }`}>
            <input type="text" placeholder="Search currency..." />
            <button type="button" value="dolar" label="Dolar" onClick={priceHandler}>$ American Dolar</button>
            <button type="button" value="euro" label="Euro" onClick={priceHandler}>€ Euro</button>
            <button type="button" value="tl" label="Turkish Lira" onClick={priceHandler}>₺ Turkish Lira</button>
          </div>
        </div>
        <input
          type="number"
          className="expense-price"
          placeholder="Type price..."
          step="1"
          max="9999999999"
          onClick={() => seterror({ ...error, expense: false })}
          onChange={(e) =>
            dispatch(
              addExpenseItem("price", {
                ...selector.price,
                price: Number(e.currentTarget.value),
              })
            )
          }
        />
      </div>
    </div>
  );
};
