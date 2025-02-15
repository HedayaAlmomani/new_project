import React, { useEffect, useState } from "react";
import Input from "../../../CoreComponent/Input";
import TextArea from "../../../CoreComponent/TextArea";
import MultiSelect from "../../../CoreComponent/MultiSelect";
import Toast from "../../../CoreComponent/Toast";
import httpServices from "../../../common/httpServices";
import "./style.scss";

const CreateMenu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [newMenuItem, setNewMenuItem] = useState({
    name: "",
    description: "",
    branch_ids: [],
  });
  const [branchesOptions, setBranchesOptions] = useState([]);
  const [errors, setErrors] = useState({
    name: "",
    description: "",
  });

  const handleSubmit = async () => {
    try {
      const response = await httpServices.post("/categories", newMenuItem);

      const toastOptions = {
        mode: "success",
        message: "Menu Item added successfully!",
      };
      Toast(toastOptions);

      setNewMenuItem({ name: "", description: "", branch_ids: [] });
    } catch (error) {
      const toastOptions = {
        mode: "error",
        message: "Failed to add Menu Item.",
      };
      Toast(toastOptions);
    }
  };

  const getBranches = async () => {
    try {
      const response = await httpServices.get("/branch");
      const branchies = response?.data?.data?.map((item) => ({
        label: item?.branch_name,
        value: item?.id,
      }));
      setBranchesOptions(branchies);
    } catch (error) {
      const toastOptions = {
        mode: "error",
        message: "Failed to load branches.",
      };
      Toast(toastOptions);
    }
  };

  const handleAddMenuItem = () => {
    const { name, branch_ids } = newMenuItem;
    let isValid = true;
    let updatedErrors = { ...errors };

    if (!name) {
      updatedErrors.name = "Name is required.";
      isValid = false;
    } else {
      updatedErrors.name = "";
    }
    if (!branch_ids.length) {
      updatedErrors.branch_ids = "Branches are required.";
      isValid = false;
    } else {
      updatedErrors.branch_ids = "";
    }
    setErrors(updatedErrors);

    if (isValid) {
      handleSubmit();
      setMenuItems((prevItems) => [...prevItems, newMenuItem]);
    }
  };

  useEffect(() => {
    getBranches();
  }, []); 

  return (
    <div className="create-menu-container">
      <h2 className="create-menu-title">Create New Menu</h2>
      <div className="menu-form">
        <Input
          label="Menu Name"
          required
          placeholder="Enter menu name"
          inputValue={newMenuItem.name}
          setInputValue={(value) =>
            setNewMenuItem({ ...newMenuItem, name: value })
          }
          errorMsg={errors.name}
          type="text"
        />
        <MultiSelect
          options={branchesOptions}
          selectedValues={newMenuItem.branch_ids}
          onChange={(selected) =>
            setNewMenuItem({ ...newMenuItem, branch_ids: selected })
          }
          label="Select Branches"
          errorMsg={errors.branch_ids}
          required
        />
        <TextArea
          label="Description"
          required={false}
          placeholder="Enter description ..."
          value={newMenuItem.description}
          setValue={(value) =>
            setNewMenuItem({ ...newMenuItem, description: value })
          }
          errorMsg={errors.description}
          type="text"
        />

        <button className="add-menu-item-btn" onClick={handleAddMenuItem}>
          Add Menu Item
        </button>
      </div>

      {!!menuItems?.length && (
        <div className="menu-items-list">
          <h3 className="menu-items-title">Menu Items</h3>
          <div>
            {menuItems.map((item, index) => (
              <div key={index} className="menu-item">
                <div className="item-info">
                  {item.name} - {item.description} <br />
                  <span>Branches:</span> {item.branch_ids.join("- ")}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateMenu;
