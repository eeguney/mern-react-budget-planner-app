import React from 'react';
import { useSelector } from 'react-redux';

const BudgetBoard = ({ debt, currentMoney }) => {

  const changes = useSelector((state) => state.record.changes)

  return (
    <div className="summary-top">
    <div className="budget-board">
      <div className="_current-money">
        <label>Current money</label>
        <div className="price-row">${currentMoney} 
        { changes.expense > 0 ? <span className="minus">-${changes.expense}</span> 
        : changes.fund > 0 ? <span className="increase">+${changes.fund}</span> : "" }
        </div>
        <span>Daily change: -12$</span>
      </div>
      <div className="_debt">
        <label>Debt</label>
        <div className="price-row">${debt} 
        </div>
        <span>Daily change: -19$</span>
      </div>
    </div>
  </div>
  );
};

export default BudgetBoard;
