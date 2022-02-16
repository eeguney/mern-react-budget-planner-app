import { useState } from "react"
import { useDispatch } from "react-redux";
import { deleteExpense, deleteFund } from "../../../../store/actions/record";
import dateShow from "../../../../utils/dateShow";
import Button from '../../Buttons';
import Icon from "../../Icons";
import TransactionsModal from '../TransactionsModal';
import "./TransactionModalComponent.scss"

const TransactionModalComponent = ({ record, modal, setModal }) => {
    const [loading, setloading] = useState(false)    
    const dispatch = useDispatch()

    const deletefund = (id) => {
      setloading(true)
        setTimeout(() => {
          dispatch(deleteFund(id))
          setloading(false)
          setModal(false)
        }, 1500);
    }

    const deleteexpense = (id) => {
      setloading(true)
        setTimeout(() => {
          dispatch(deleteExpense(id))
          setloading(false)
          setModal(false)
        }, 1500);
    }

  return (
    <TransactionsModal setModal={() => setModal({ status: false })}>
    <div className="transactionsModal">
      {modal.type === "fund"
        ? record.funds
            .filter((filter) => filter._id === modal.id)
            .map((item) => {
              const date = Math.ceil(
                Math.abs(new Date(item.date) - new Date()) /
                  (1000 * 60 * 60 * 24)
              );
              return (
                <div className="transaction-item">
                  <label>Fund Item</label>
                  <div className="_top">
                    <div className="category">
                      Category: <span>{item.source}</span>
                    </div>
                    <div className="person">
                      Earning By: <span>{item.earningBy}</span>
                    </div>
                    <div className="date">
                      Date: <span>{dateShow(date)}</span>
                    </div>
                  </div>
                  <div className="desc">
                    Note: <span>{item.note ? item.note : "No note"}</span>
                  </div>
                  <div className="price">
                    Price: <span>${item.price.price}</span>
                  </div>
                  <Button.Submit style={{ marginTop: "15px" }} onClick={() => deletefund(item._id)}>
                    { loading ? <Icon.Spinner size="15" /> : "REMOVE" }
                  </Button.Submit>
                </div>
              );
            })
        : record.expenses
            .filter((filter) => filter._id === modal.id)
            .map((item) => {
              const date = Math.ceil(
                Math.abs(new Date(item.date) - new Date()) /
                  (1000 * 60 * 60 * 24)
              );
              return (
                <div className="transaction-item">
                  <label>Expense Item</label>
                  <div className="_top">
                    <div className="category">
                      Category: <span>{item.category}</span>
                    </div>
                    <div className="person">
                      Spending By: <span>{item.spendingBy}</span>
                    </div>
                    <div className="date">
                      Date: <span>{dateShow(date)}</span>
                    </div>
                  </div>
                  <div className="name">
                    Name: <span>{item.name}</span>
                  </div>
                  {item.note && (
                    <div className="desc">
                      Note: <span>{item.note}</span>
                    </div>
                  )}
                  <div className="price">
                    Price: <span>${item.price.price}</span>
                  </div>
                  <Button.Submit style={{ marginTop: "15px" }} onClick={() => deleteexpense(item._id)}>
                  { loading ? <Icon.Spinner size="15" /> : "REMOVE" }
                  </Button.Submit>
                </div>
              );
            })}
    </div>
  </TransactionsModal>
  )
}

export default TransactionModalComponent