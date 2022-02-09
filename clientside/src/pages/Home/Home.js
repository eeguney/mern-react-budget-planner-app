import React from "react";
import Component from "../../components";
import Wrapper from "../../components/Wrapper/Wrapper";

const Home = () => {
  return (
    <>
      <Component.Welcome />
      <Wrapper>
        <Component.Drawer />
        <Component.ExpenseForm />
        <Component.ExpenseSummary />
      </Wrapper>
    </>
  );
};

export default Home;
