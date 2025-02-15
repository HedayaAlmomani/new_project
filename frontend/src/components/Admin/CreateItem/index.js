import React, { useEffect, useState } from "react";
import Input from "../../../CoreComponent/Input";
import Select from "../../../CoreComponent/Select";
import TextArea from "../../../CoreComponent/TextArea";
import Toast from "../../../CoreComponent/Toast";
import httpServices from "../../../common/httpServices";
import { currencies } from "../../../common/currencies";
import ImageUpload from "../../../CoreComponent/ImageUpload";
import CustomFormWrapper from "../../../CoreComponent/CustomFormWrapper";
import "./style.scss";

const CreateItem = ({ setIsOpen, selectedItem, fetchData }) => {
  const [item, setItem] = useState({
    name: "",
    description: "",
    price: "",
    discount_price: "",
    branch_id: {},
    category_id: {},
    currency: {},
    size: "",
    flavor: "",
    image: null,
  });
  console.log(selectedItem);

  const [branchOptions, setBranchOptions] = useState([]);
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [errors, setErrors] = useState({});
  const isEdit = !!selectedItem;
  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append("name", item.name);
      formData.append("description", item.description);
      formData.append("price", item.price);
      formData.append("discount_price", item.discount_price);
      formData.append("branch_id", item?.branch_id?.value || "");
      formData.append("category_id", item?.category_id?.value || "");
      formData.append("currency", item?.currency?.value || "");
      formData.append("size", item?.size || "");
      formData.append("flavor", item?.flavor || "");
      formData.append("image", item?.image);

      const response = await httpServices.post("/item", formData);
      Toast({ mode: "success", message: "Item added successfully!" });
      fetchData(true, 1);
      setItem({
        name: "",
        description: "",
        price: "",
        discount_price: "",
        branch_id: null,
        category_id: null,
        currency: null,
        size: "",
        flavor: "",
        image: null,
      });
      setIsOpen(false);
    } catch (error) {
      console.error("Error while submitting:", error);
      Toast({ mode: "error", message: "Failed to add item." });
    }
  };
  const handleEdit = async () => {
    try {
      const formData = new FormData();
      formData.append("name", item.name);
      formData.append("description", item.description);
      formData.append("price", item.price);
      formData.append("discount_price", item.discount_price);
      formData.append("branch_id", item?.branch_id?.value || "");
      formData.append("category_id", item?.category_id?.value || "");
      formData.append("currency", item?.currency?.value || "");
      formData.append("size", item?.size || "");
      formData.append("flavor", item?.flavor || "");
      formData.append("image", item?.image);

      const response = await httpServices.put(
        `/item/${selectedItem?.id}`,
        formData
      );
      Toast({ mode: "success", message: "Item updated successfully!" });
      fetchData(true, 1);
      setItem({
        name: "",
        description: "",
        price: "",
        discount_price: "",
        branch_id: null,
        category_id: null,
        currency: null,
        size: "",
        flavor: "",
        image: null,
      });
      setIsOpen(false);
    } catch (error) {
      console.error("Error while submitting:", error);
      Toast({ mode: "error", message: "Failed to add item." });
    }
  };
  const getBranches = async () => {
    try {
      const response = await httpServices.get("/branch");
      const branches = response?.data?.data?.map((branch) => ({
        label: branch.branch_name,
        value: branch.id,
      }));
      setBranchOptions(branches);
    } catch {
      Toast({ mode: "error", message: "Failed to load branches." });
    }
  };

  const getCategory = async () => {
    if (!item?.branch_id?.value && !isEdit) return;

    const url = isEdit
      ? `/branches-categories`
      : `/branches-categories/${item?.branch_id?.value}`;
    try {
      const response = await httpServices.get(url, {}, false);
      setCategoryOptions(
        response.data.categories?.map((item) => ({
          label: item?.name,
          value: item?.id,
        }))
      );
    } catch {
      Toast({ mode: "error", message: "Failed to load branches." });
    }
  };

  const handleChange = (field, value) => {
    setItem({ ...item, [field]: value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!item.name) newErrors.name = "Name is required.";
    if (!item.description) newErrors.description = "Description is required.";
    if (!item.price) newErrors.price = "Price is required.";
    if (!item.branch_id) newErrors.branch_id = "Branch category is required.";
    if (!item.category_id) newErrors.category_id = "Category is required.";
    if (!item.currency) newErrors.currency = "Currency is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const areRequiredFieldsFilled = () => {
    const requiredFields = [
      "name",
      "description",
      "price",
      "branch_id",
      "category_id",
      "currency",
      "image",
    ];

    return requiredFields.every((key) => {
      const value = item[key];
      if (Array.isArray(value)) {
        return value.length > 0;
      }
      return value !== "" && value !== null;
    });
  };

  const handleAddItem = () => {
    if (validateForm()) {
      handleSubmit();
    }
  };
  const setData = () => {
    setItem((prev) => ({
      ...prev,
      name: selectedItem.name,
      description: selectedItem.description,
      price: selectedItem.price,
      discount_price: selectedItem.discount_price,
      category_id: categoryOptions.find(
        (item) => item?.value == selectedItem.category_id
      ),
      currency: currencies.find((item) => item?.value == selectedItem.currency), // تحويله إلى مصفوفة
      branch_id: branchOptions.find(
        (item) => item?.value == selectedItem.branch_id
      ),
      size: selectedItem.size,
      flavor: selectedItem.flavor,
      image: selectedItem.image,
    }));
  };

  const dataNotChanged = () => {
    return (
      item.name === selectedItem.name &&
      item.description === selectedItem.description &&
      item.price === selectedItem.price &&
      item.discount_price === selectedItem.discount_price &&
      item.size.toLowerCase().trim() ===
        selectedItem.size.toLowerCase().trim() &&
      item.flavor === selectedItem.flavor &&
      item.image === selectedItem.image &&
      item.branch_id.value === selectedItem.branch_id &&
      item.category_id.value === selectedItem.category_id &&
      item.currency.value === selectedItem.currency
    );
  };

  useEffect(() => {
    getBranches();
    isEdit && getCategory();
  }, []);

  useEffect(() => {
    !isEdit && getCategory();
  }, [item?.branch_id]);

  useEffect(() => {
    if (branchOptions?.length && categoryOptions?.length && isEdit) {
      setData();
    }
  }, [branchOptions, categoryOptions, selectedItem]);

  return (
    <CustomFormWrapper
      title={isEdit ? `Edit ${selectedItem.name}` : "Create Item"}
      handleSubmit={isEdit ? handleEdit : handleAddItem}
      setOpenForm={setIsOpen}
      isSubmitDisabled={
        isEdit
          ? !areRequiredFieldsFilled() || dataNotChanged()
          : !areRequiredFieldsFilled()
      }
    >
      <div className="item-form-container">
        <Input
          label="Name"
          required
          placeholder="Enter item name"
          inputValue={item.name}
          setInputValue={(value) => handleChange("name", value)}
          errorMsg={errors.name}
          type="text"
        />
        <TextArea
          label="Description"
          placeholder="Enter description..."
          value={item.description}
          setValue={(value) => handleChange("description", value)}
          errorMsg={errors.description}
        />
        <Input
          label="Price"
          required
          placeholder="Enter price"
          inputValue={item.price}
          setInputValue={(value) => handleChange("price", value)}
          errorMsg={errors.price}
          type="number"
        />
        <Input
          label="Discount Price"
          placeholder="Enter discount price"
          inputValue={item.discount_price}
          setInputValue={(value) => handleChange("discount_price", value)}
          type="number"
          required={false}
        />
        <Select
          label="Branch"
          options={branchOptions}
          value={item.branch_id}
          setValue={(value) => handleChange("branch_id", value)}
          errorMsg={errors.branch_id}
          placeholder="Select branch category"
          required
        />
        <Select
          label="Category"
          options={categoryOptions}
          value={item.category_id}
          setValue={(value) => handleChange("category_id", value)}
          errorMsg={errors.category_id}
          placeholder="Select branch category"
          required
        />
        <Select
          label="Currency"
          options={currencies}
          value={item.currency}
          setValue={(value) => handleChange("currency", value)}
          errorMsg={errors.currency}
          placeholder="Select currency"
          required
        />
        <Input
          label="Size"
          placeholder="Enter size"
          inputValue={item.size}
          setInputValue={(value) => handleChange("size", value)}
          required={false}
        />
        <Input
          label="Flavor"
          placeholder="Enter flavor"
          inputValue={item.flavor}
          setInputValue={(value) => handleChange("flavor", value)}
          required={false}
        />
        <ImageUpload
          label="Image"
          placeholder="Enter Image"
          inputValue={item.image}
          setInputValue={(value) => handleChange("image", value)}
          required={true}
          allowedExtensions={["jpg", "png", "jpeg", "gif"]}
        />
      </div>
    </CustomFormWrapper>
  );
};

export default CreateItem;
