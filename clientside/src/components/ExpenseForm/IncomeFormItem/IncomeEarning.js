import { addIncomeItem, toggleIncome } from "../../../store/actions/addIncome";

export const IncomeEarning = ({ prop }) => {
  const { label, dispatch, selector, error, seterror } = prop;
  // earning handler

  const earningHandler = (e) => {
    dispatch(
      addIncomeItem("price", {
        ...selector.price,
        currency: e.target.getAttribute("label"),
      })
    );
  };
  return (
    <div className="addIncomeItem">
      <label>{label}</label>
      <div className={`__inner ${error && "anError"}`}>
        <div className="income-currency-selector">
          <button
            type="button"
            className="selectCurrency"
            onClick={() => dispatch(toggleIncome("priceCurrency"))}
          >
            {selector.price.currency}
          </button>
          <div
            className={`currency-list ${
              selector.toggle.priceCurrency ? "active" : ""
            }`}
          >
            <input type="text" placeholder="Search currency..." />
            <button type="button" value="dolar" label="$ American Dolar" onClick={earningHandler}>
              $ American Dolar
            </button>
            <button type="button" value="euro" label="€ Euro" onClick={earningHandler}>
              € Euro
            </button>
            <button type="button" value="sterlin" label="£ Sterlin" onClick={earningHandler}>
              £ Sterlin
            </button>
            <button type="button" value="ruble" label="₽ Russian Ruble" onClick={earningHandler}>
              ₽ Russian Ruble
            </button>
            <button type="button" value="turkish-liras" label="₺ Turkish Liras" onClick={earningHandler}>
              ₺ Turkish Liras
            </button>
          </div>
        </div>
        <input
          type="number"
          className="income-earning"
          placeholder="Type price..."
          step="0.1"
          min="0.1"
          max="9999999999"
          onClick={() => seterror({ ...error, expense: false })}
          onChange={(e) =>
            dispatch(
              addIncomeItem("price", {
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
