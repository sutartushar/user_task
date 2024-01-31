import { GrAdd } from "react-icons/gr";
import { useState, useEffect } from "react";
import { MdDeleteForever } from "react-icons/md";
import { AiFillEdit } from "react-icons/ai";
import { TiTick } from "react-icons/ti";
import { FaUserSecret } from "react-icons/fa";

const localItemData = () => {
  const localItem = localStorage.getItem("data");
  if (localItem) {
    return JSON.parse(localItem);
  }
  return [];
};

function App() {
  const [inputData, setInputData] = useState("");
  const [item, setItem] = useState(localItemData());
  const [toggleBtn, setToggleBtn] = useState(true);
  const [isEdit, setIsEdit] = useState(null);

  //click on plus icon
  const handleAddBtnClick = () => {
    if (!inputData) {
      alert(`Add a user in field!`);
    } else if (inputData && !toggleBtn) {
      setItem(
        item.map((val) => {
          if (val.id === isEdit) {
            return { ...val, name: inputData };
          }
          return val;
        })
      );
      setInputData("");
      setIsEdit(null);
      setToggleBtn(true);
    } else {
      const inputItem = {
        id: Math.random(),
        name: inputData,
      };
      setItem([...item, inputItem]);
      setInputData("");
    }
  };

  // click on edit icon
  const editData = (id) => {
    let newData = item.find((val) => {
      return val.id === id;
    });
    setToggleBtn(false);
    setInputData(newData.name);
    setIsEdit(id);
  };

  //click on delete icon
  const deleteData = (id) => {
    let deleteItem = item.filter((val) => {
      return val.id !== id;
    });
    setItem(deleteItem);
  };

  //click on clear all
  const removeAll = () => {
    setItem([]);
  };

  useEffect(() => {
    localStorage.setItem("data", JSON.stringify(item));
  }, [item]);

  return (
    <div>
      <div className="header-title">
        <input
          type="text"
          placeholder="Add users..."
          className="input-field"
          value={inputData}
          onChange={(e) => setInputData(e.target.value)}
        />
        {toggleBtn ? (
          <GrAdd className="add-icon" onClick={handleAddBtnClick} />
        ) : (
          <TiTick className="add-icon" onClick={handleAddBtnClick} />
        )}
      </div>

      {item.map((val) => (
        <div key={val.id} className="item">
          <p>{val.name}</p>
          <div className="icons">
            <AiFillEdit onClick={() => editData(val.id)} />
            <MdDeleteForever onClick={() => deleteData(val.id)} />
          </div>
        </div>
      ))}
      <div>
        {item.length > 0 ? (
          <div className="remove-all">
            <button className="clear-all-btn" onClick={removeAll}>
              Clear All
            </button>
          </div>
        ) : (
          <h3 className="add-user">
            Add Userrs
            <FaUserSecret />
          </h3>
        )}
      </div>
    </div>
  );
}
export default App;
