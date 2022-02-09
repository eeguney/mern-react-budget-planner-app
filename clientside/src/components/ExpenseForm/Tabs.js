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
            tabHandler(0);
          }}
        />
        <Button.AddIncome
          icon={<Icon.Income size="22" />}
          label="Add Funds"
          onClick={() => {
            tabHandler(-50);
          }}
        />
      </div>
      <div
        className="tabs-container"
        style={{ transform: "translateX(" + tab.translate + "%)" }}
      >
        {children}
      </div>
    </div>
  );
};

export default Tabs;
