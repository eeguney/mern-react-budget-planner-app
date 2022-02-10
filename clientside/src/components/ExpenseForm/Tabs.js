import React from "react";
import Button from "../UI/Buttons";
import Icon from "../UI/Icons";

const Tabs = ({ children, tabHandler, tab }) => {
  return (
    <div className="tabs">
      <div className="tab-changer-top">
        <Button.AddExpense
          icon={<Icon.Expense size="22" />}
          label="Add Expense"
          onClick={() => {
            tabHandler(1);
          }}
        />
        <Button.AddIncome
          icon={<Icon.Income size="22" />}
          label="Add Funds"
          onClick={() => {
            tabHandler(2);
          }}
        />
      </div>
      <div
        className="tabs-container"
        style={tab.translate === 1 ? { transform: "translateX(0)" } : { transform: "translateX(calc(-50% - 25px))" }}
      >
        {children}
      </div>
    </div>
  );
};

export default Tabs;
