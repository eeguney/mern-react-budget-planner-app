import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import Component from "../../components";
import FormModal from "../../components/UI/Modals/FormModal";
import TransactionModalComponent from "../../components/UI/Modals/TransactionModalComponent/TransactionModalComponent";
import Wrapper from "../../components/Wrapper/Wrapper";
import Transactions from "../Transactions/Transactions";

const Home = () => {
  const location = useLocation();
  const record = useSelector((state) => state.record);
  const [modal, setModal] = useState({ status: false, type: null, id: null });
  const [transactionsAnim, setTransactionsAnim] = useState(false);
  const path = location.pathname;

  useEffect(() => {
    const animation = () => {
      setTransactionsAnim(true);
    };
    animation();
  }, [path]);

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
        {path === "/transactions" && (
          <FormModal>
            <Transactions
              className={
                transactionsAnim ? "fadeInAndTranslate" : "fadeOutAndTranslate"
              }
              openModal={(id, type) => {
                setModal({ status: true, type, id });
              }}
            />
          </FormModal>
        )}
      </Wrapper>
      {modal.status && (
        <TransactionModalComponent
          modal={modal}
          setModal={setModal}
          record={record}
        />
      )}
    </>
  );
};

export default Home;
