import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { toggleExpense } from "../../../store/actions/addExpense";
import { addCategory } from "../../../store/actions/record";
import Form from "../../UI/Form";
import Icon from "../../UI/Icons";
import FormModal from "../../UI/Modals/FormModal";

const AddCategory = ({ dispatch }) => {
  const categories = useSelector((state) => state.record.categories);
  const categoryRef = useRef();
  const [status, setstatus] = useState({ status: false, info: null });
  const [isExist, setIsExist] = useState(false);

  const checkIsExist = () => {
    setIsExist(
      categories.some(
        (item) =>
          categoryRef.current.value.toLowerCase() === item.name.toLowerCase()
      )
    );
  };

  const add = () => {
    setstatus({ status: true, info: null });
    setTimeout(() => {
      dispatch(addCategory(categoryRef.current.value)).then((proccess) => {
        if (proccess) {
          setstatus({ status: true, info: true });
        } else {
          setstatus({ status: true, info: false });
        }
      });
    }, 1500);
    setTimeout(() => {
      dispatch(toggleExpense("addCategory"));
    }, 3000);
  };

  return (
    <FormModal dispatch={dispatch}>
      <div className="addPerson--modal">
        <h3>New Category</h3>
        <input
          ref={categoryRef}
          type="text"
          placeholder="Type name of the new category..."
          onChange={checkIsExist}
        />
        {isExist && <p>This category name already exist...</p>}
        <Form.Submit
          style={
            status.info === true
              ? { background: "green", "margin-top": "4px" }
              : status.info === false
              ? { background: "red" }
              : {}
          }
          disabled={isExist}
          label={
            !status.status ? (
              "ADD"
            ) : status.info === null ? (
              <Icon.Spinner size="15" />
            ) : status.info === true ? (
              <Icon.Success size="16" />
            ) : (
              "Something went wrong"
            )
          }
          onClick={add}
        />
      </div>
    </FormModal>
  );
};

export default AddCategory;
