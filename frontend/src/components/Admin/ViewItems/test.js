import React, { useState, useEffect } from "react";
import httpServices from "../../../common/httpServices";
import Table from "../../../CoreComponent/Table";
import Select from "../../../CoreComponent/Select";
import MySideDrawer from "../../../CoreComponent/SideDrawer";
import { headers, paginationInfo } from "./helper";
import Input from "../../../CoreComponent/Input";
import "./style.scss";

const ViewItems = () => {
  const [data, setData] = useState([]);
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [filter, setFilter] = useState({
    branch_id: { value: null, label: "" },
    category_id: { value: null, label: "" },
    name: "",
  });
  const [pagination, setPagination] = useState(paginationInfo);
  const [branchOptions, setBranchOptions] = useState([]);
  const [categoryOptions, setCategoryOptions] = useState([]);

  const fetchData = async (page = 1) => {
    try {
      const response = await httpServices.get("/item", {
        branch_id: filter?.branch_id?.value || null,
        category_id: filter?.category_id?.value || null,
        name: filter?.name || null,
        page: page,
        per_page: pagination.perPage,
      });

      const { data: items, pagination: pageData } = response.data;
      const tableData = items?.map((item) => ({
        ...item,
        actions: (
          <div className="actions-container">
            <button className="edit" onClick={() => handleEditClick(item)}>
              Edit
            </button>
            <button className="delete">Delete</button>
          </div>
        ),
      }));
      setData(tableData);
      setPagination(pageData);
    } catch (error) {
      setData([]);
      setPagination(paginationInfo);
      console.error("Error fetching data:", error);
    }
  };

  const handleEditClick = (item) => {
    setSelectedItem(item);
    setDrawerOpen(true);
  };

  const getBranches = async () => {
    try {
      const response = await httpServices.get("/branch");
      const branches = response?.data?.data?.map((branch) => ({
        label: branch.branch_name,
        value: branch.id,
      }));
      setBranchOptions(branches);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (field, value) => {
    setFilter({ ...filter, [field]: value });
  };

  const getCategory = async () => {
    try {
      const response = await httpServices.get(`/categories`);
      console.log(response);

      setCategoryOptions(
        response.data.data?.map((item) => ({
          label: item?.name,
          value: item?.id,
        }))
      );
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData(pagination.currentPage);
  }, [pagination.currentPage, filter]);

  useEffect(() => {
    getCategory();
    getBranches();
  }, []);

  return (
    <div className="view-items-container">
      <div className="filters-container">
        <Select
          label="Branch"
          options={branchOptions}
          value={filter.branch_id}
          setValue={(value) => handleChange("branch_id", value)}
          placeholder="Select branch"
          required={false}
        />
        <Select
          label="Category"
          options={categoryOptions}
          value={filter.category_id}
          setValue={(value) => handleChange("category_id", value)}
          placeholder="Select category"
          required={false}
        />
        <Input
          label="Name"
          placeholder="Enter Item name"
          inputValue={filter.name}
          setInputValue={(value) => handleChange("name", value)}
          errorMsg={""}
          type="text"
          required={false}
        />
      </div>
      <Table
        headers={headers}
        data={data}
        setPagination={setPagination}
        pagination={pagination}
        onPageChange={(newPage) =>
          setPagination({ ...pagination, currentPage: newPage })
        }
      />
      <MySideDrawer isOpen={isDrawerOpen} setIsOpen={setDrawerOpen}>
        {selectedItem && (
          <EditItem item={selectedItem} setDrawerOpen={setDrawerOpen} />
        )}
      </MySideDrawer>
    </div>
  );
};

export default ViewItems;
