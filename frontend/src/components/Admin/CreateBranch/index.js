import React, { useEffect, useState } from "react";
import Input from "../../../CoreComponent/Input";
import TextArea from "../../../CoreComponent/TextArea";
import Toast from "../../../CoreComponent/Toast";
import httpServices from "../../../common/httpServices";
import CustomFormWrapper from "../../../CoreComponent/CustomFormWrapper";
import "./style.scss";

const CreateBranch = ({ setIsOpen, selectedItem, fetchData }) => {
  const [newBranch, setNewBranch] = useState({
    restaurant_id: 1,
    branch_name: "",
    address: "",
    phone: "",
    working_hours: "",
    manager_name: "",
    email: "",
    location: "",
  });

  const [errors, setErrors] = useState({
    branch_name: "",
    address: "",
    phone: "",
    working_hours: "",
    manager_name: "",
    email: "",
    location: "",
  });
  const isEdit = !!selectedItem;

  const handleSubmit = async () => {
    try {
      const response = await httpServices.post("/branch", newBranch);
      const toastOptions = {
        mode: "success",
        message: "Branch created successfully!",
      };
      Toast(toastOptions);
      fetchData()
      setIsOpen(true);
      setNewBranch({
        branch_name: "",
        address: "",
        phone: "",
        working_hours: "",
        manager_name: "",
        email: "",
        location: "",
      });
    } catch (error) {
      const toastOptions = {
        mode: "error",
        message: "Failed to create branch.",
      };
      Toast(toastOptions);
    }
  };

  const handleEdit = async () => {
    try {
      const response = await httpServices.put(
        `/branch/${selectedItem?.id}`,
        newBranch
      );

      const toastOptions = {
        mode: "success",
        message: "Branch updated successfully!",
      };
      Toast(toastOptions);
      setIsOpen(false)
      fetchData()
      setNewBranch({
        branch_name: "",
        address: "",
        phone: "",
        working_hours: "",
        manager_name: "",
        email: "",
        location: "",
      });
    } catch (error) {
      const toastOptions = {
        mode: "error",
        message: "Failed to create branch.",
      };
      Toast(toastOptions);
    }
  };

  const handleAddBranch = () => {
    let isValid = true;
    let updatedErrors = { ...errors };

    // Validate fields
    Object.keys(newBranch).forEach((key) => {
      if (
        !newBranch[key] &&
        key !== "phone" &&
        key !== "working_hours" &&
        key !== "manager_name" &&
        key !== "email" &&
        key !== "location"
      ) {
        updatedErrors[key] = `${key.replace("_", " ")} is required.`;
        isValid = false;
      } else {
        updatedErrors[key] = "";
      }
    });

    setErrors(updatedErrors);

    if (isValid) {
      handleSubmit();
    }
  };
  const areRequiredFieldsFilled = () => {
    const requiredFields = [
      "restaurant_id",
      "branch_name",
      "address",
      "branch_id",
      "phone",
      "working_hours",
      "email",
      "location",
    ];

    return requiredFields.every((key) => {
      const value = newBranch[key];
      if (Array.isArray(value)) {
        return value.length > 0;
      }
      return value !== "" && value !== null;
    });
  };
  const dataNotChanged = () => {
    return (
      newBranch.restaurant_id === selectedItem.restaurant_id &&
      newBranch.branch_name === selectedItem.branch_name &&
      newBranch.address === selectedItem.address &&
      newBranch.branch_id === selectedItem.branch_id &&
      newBranch.phone === selectedItem.phone &&
      newBranch.working_hours === selectedItem.working_hours &&
      newBranch.email === selectedItem.email &&
      newBranch.manager_name === selectedItem.manager_name &&
      newBranch.location === selectedItem.location
    );
  };

  const getData = () => {
    setNewBranch({
      restaurant_id: selectedItem?.restaurant_id,
      branch_name: selectedItem?.branch_name,
      address: selectedItem?.address,
      phone: selectedItem?.phone,
      working_hours: selectedItem?.working_hours,
      manager_name: selectedItem?.manager_name,
      email: selectedItem?.email,
      location: selectedItem?.location,
    });
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <CustomFormWrapper
      title={isEdit ? `Edit ${selectedItem.branch_name}` : "Create Branch"}
      handleSubmit={isEdit ? handleEdit : handleAddBranch}
      setOpenForm={setIsOpen}
      isSubmitDisabled={
        isEdit
          ? !areRequiredFieldsFilled() || dataNotChanged()
          : !areRequiredFieldsFilled()
      }
    >
      <div className="create-branch-container">
        <div className="branch-form">
          <Input
            label="Branch Name"
            required
            placeholder="Enter branch name"
            inputValue={newBranch.branch_name}
            setInputValue={(value) =>
              setNewBranch({ ...newBranch, branch_name: value })
            }
            errorMsg={errors.branch_name}
            type="text"
          />
          <Input
            label="Address"
            required
            placeholder="Enter address"
            inputValue={newBranch.address}
            setInputValue={(value) =>
              setNewBranch({ ...newBranch, address: value })
            }
            errorMsg={errors.address}
            type="text"
          />
          <Input
            label="Phone"
            required={true}
            placeholder="Enter phone number"
            inputValue={newBranch.phone}
            setInputValue={(value) =>
              setNewBranch({ ...newBranch, phone: value })
            }
            errorMsg={errors.phone}
            type="text"
          />
          <Input
            label="Working Hours"
            required={false}
            placeholder="Enter working hours"
            inputValue={newBranch.working_hours}
            setInputValue={(value) =>
              setNewBranch({ ...newBranch, working_hours: value })
            }
            errorMsg={errors.working_hours}
            type="text"
          />
          <Input
            label="Manager Name"
            required={true}
            placeholder="Enter manager name"
            inputValue={newBranch.manager_name}
            setInputValue={(value) =>
              setNewBranch({ ...newBranch, manager_name: value })
            }
            errorMsg={errors.manager_name}
            type="text"
          />
          <Input
            label="Email"
            required={true}
            placeholder="Enter email"
            inputValue={newBranch.email}
            setInputValue={(value) =>
              setNewBranch({ ...newBranch, email: value })
            }
            errorMsg={errors.email}
            type="email"
          />
          <TextArea
            label="Location"
            required={true}
            placeholder="Enter location"
            value={newBranch.location}
            setValue={(value) =>
              setNewBranch({ ...newBranch, location: value })
            }
            errorMsg={errors.location}
            type="text"
          />
        </div>
      </div>
    </CustomFormWrapper>
  );
};

export default CreateBranch;
