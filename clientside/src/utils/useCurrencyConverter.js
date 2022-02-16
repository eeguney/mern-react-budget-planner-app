import { useEffect, useState } from "react";
import { currencyApi } from "../api";
const useCurrencyConverter = () => {
  const currentCurrency = localStorage.getItem("currency");
  const [fetch, setFetch] = useState([]);
  const [result, convert] = useState("");

  useEffect(() => {
    const fetchAllCurrency = () => {
      switch (currentCurrency) {
        case "Dolar":
          currencyApi("USD").then((item) => {
            setFetch(item.data.data);
          });
          break;
        case "Euro":
          currencyApi("EUR").then((item) => {
            setFetch(item.data.data);
          });
          break;
        case "TL":
          currencyApi("TRY").then((item) => {
            setFetch(item.data.data);
          });
          break;

        default:
          break;
      }
    };
    fetchAllCurrency();
  }, []);

  const convertCurrency = async (currency, price) => {
    switch (currency) {
      case "Dolar":
        convert(price / fetch.USD);
        return price / fetch.USD;

      case "Euro":
        convert(price / fetch.EUR);
        return price / fetch.EUR;
      case "TL":
        convert(price / fetch.TRY);
        return price / fetch.TRY;

      default:
        break;
    }
  };
  return [result, convertCurrency];
};

export default useCurrencyConverter;
