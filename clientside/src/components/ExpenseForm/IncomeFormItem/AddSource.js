import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { toggleIncome } from "../../../store/actions/addIncome";
import { addSource } from "../../../store/actions/record";
import Form from "../../UI/Form";
import Icon from "../../UI/Icons";
import FormModal from "../../UI/Modals/FormModal";

const AddSource = ({ dispatch }) => {
  const sources = useSelector((state) => state.record.sources);
  const sourceRef = useRef();
  const [status, setstatus] = useState({ status: false, info: null });
  const [isExist, setIsExist] = useState(false);

  const checkIsExist = () => {
    setIsExist(
      sources.some(
        (item) =>
          sourceRef.current.value.toLowerCase() === item.name.toLowerCase()
      )
    );
  };

  const add = () => {
    setstatus({ status: true, info: null });
    setTimeout(() => {
      dispatch(addSource(sourceRef.current.value)).then((proccess) => {
        if (proccess) {
          setstatus({ status: true, info: true });
        } else {
          setstatus({ status: true, info: false });
        }
      });
    }, 1500);
    setTimeout(() => {
      dispatch(toggleIncome("addSource"));
    }, 3000);
  };
  return (
    <FormModal dispatch={dispatch}>
      <div className="addPerson--modal">
        <h3>New Source</h3>
        <input
          ref={sourceRef}
          type="text"
          placeholder="Type name of the new source..."
          onChange={checkIsExist}
        />
        {isExist && <p>This source name already exist...</p>}
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

export default AddSource;
