import { useState } from "react";
import { useSelector } from "react-redux";
import Component from "../../components";
import Button from "../../components/UI/Buttons";
import TransactionModalComponent from "../../components/UI/Modals/TransactionModalComponent/TransactionModalComponent";
import TransactionsModal from "../../components/UI/Modals/TransactionsModal";
import Wrapper from "../../components/Wrapper/Wrapper";

const Home = () => {
  const [modal, setModal] = useState({ status: false, type: null, id: null });
  const record = useSelector((state) => state.record);

  return (
    <>
      <Component.Welcome />
      <Wrapper>
        <Component.Drawer />
        <Component.ExpenseForm />
        <Component.ExpenseSummary
          openModal={(id, type) => {
            setModal({ status: true, type, id });
          }}
        />
      </Wrapper>
      {modal.status && (
        <TransactionModalComponent modal={modal} setModal={setModal} record={record} />
      )}
    </>
  );
};

export default Home;
