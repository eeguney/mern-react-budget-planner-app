import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import currencyIcon from '../../../utils/currencyIcon';

const BudgetBoard = ({ debt, currentMoney, rates }) => {

  const changes = useSelector((state) => state.record.changes)
  const [daily, setDaily] = useState(0)
  useEffect(() => {
    let result = 0;
    for(const value of rates){
      const newValue = daily + value.dailyAvg
      result += newValue
    }
    setDaily(parseInt(result / 30))
  }, [rates])
  
  return (
    <div className="summary-top">
    <div className="budget-board">
      <div className="_current-money">
        <label>Current money</label>
        <div className="price-row">{currencyIcon(localStorage.getItem("currency"))}{currentMoney} 
        { changes.expense > 0 ? <span className="minus">-${changes.expense}</span> 
        : changes.fund > 0 ? <span className="increase">+${changes.fund}</span> : "" }
        </div>
        <span>Avg daily loss: {daily}{currencyIcon(localStorage.getItem("currency"))}</span>
      </div>
      <div className="_debt">
        <label>Debt</label>
        <div className="price-row">{currencyIcon(localStorage.getItem("currency"))}{debt} 
        </div>
      </div>
    </div>
  </div>
  );
};

export default BudgetBoard;
