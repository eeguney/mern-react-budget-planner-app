import React from 'react';

const RecentTransactions = () => {
  return (
    <div className="recent-transactions">
    <h3>Last 5 transactions</h3>
    <ul className="_list">
      <li className="expense--li">
        <span className="item-category">Food</span>
        <span className="item-name">Magnum Ice Cream</span>
        <span className="item-spendingBy">Hillary</span>
        <span className="item-date">Today</span>
        <span className="item-price">
          <div>-$2.2</div>
        </span>
      </li>
      <li className="fund--li">
        <span className="item-category">Wage</span>
        <span className="item-name">Wage from my work</span>
        <span className="item-spendingBy">John</span>
        <span className="item-date">3 days</span>
        <span className="item-price">
          <div>$620</div>
        </span>
      </li>
      <li className="expense--li">
        <span className="item-category">Food</span>
        <span className="item-name">Magnum Ice Cream</span>
        <span className="item-spendingBy">Hillary</span>
        <span className="item-date">Today</span>
        <span className="item-price">
          <div>-$2.2</div>
        </span>
      </li>
      <li className="fund--li">
        <span className="item-category">Wage</span>
        <span className="item-name">Wage from my work</span>
        <span className="item-spendingBy">John</span>
        <span className="item-date">3 days</span>
        <span className="item-price">
          <div>$620</div>
        </span>
      </li>
      <li className="fund--li">
        <span className="item-category">Wage</span>
        <span className="item-name">Wage from my work</span>
        <span className="item-spendingBy">John</span>
        <span className="item-date">3 days</span>
        <span className="item-price">
          <div>$62520</div>
        </span>
      </li>
    </ul>
  </div>
  )
};

export default RecentTransactions;
