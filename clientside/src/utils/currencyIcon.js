const currencyIcon = (currency) => {
  switch (currency) {
    case "Dolar":
      return "$";
    case "Euro":
      return "€";
    case "TL":
      return "₺";
    default:
      break;
  }
};
export default currencyIcon;
