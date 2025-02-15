import React, { useState, useEffect } from "react";
import httpServices from "../../../common/httpServices";
import Select from "../../../CoreComponent/Select";
import MySideDrawer from "../../../CoreComponent/SideDrawer";
import { paginationInfo } from "./helper";
import Input from "../../../CoreComponent/Input";
import ItemCard from "../ItemCard";
import ViewItemDetails from "../ViewItemDetails";
import Toast from "../../../CoreComponent/Toast";
import "./style.scss";
import CreateItem from "../CreateItem";

const ViewItems = () => {
  const [data, setData] = useState([]);
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [openViewDrawer, setOpenViewDrawer] = useState(false);
  const [openCreateDrawer, setOpenCreateDrawer] = useState(false);
  const [pagination, setPagination] = useState(paginationInfo);
  const [branchOptions, setBranchOptions] = useState([]);
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [filter, setFilter] = useState({
    branch_id: { value: null, label: "" },
    category_id: { value: null, label: "" },
    name: "",
  });

  const fetchData = async (resetData = false, page) => {
    try {
      const response = await httpServices.get("/item", {
        branch_id: filter?.branch_id?.value || null,
        category_id: filter?.category_id?.value || null,
        name: filter?.name || null,
        page: page ?? pagination?.currentPage,
        per_page: pagination.perPage,
      });

      const { data: items, pagination: pageData } = response.data;
      if (resetData) {
        setData((prevData) => [...items]);
      } else {
        setData((prevData) => [...prevData, ...items]);
      }
      pageData && setPagination(pageData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleEditClick = (item) => {
    setSelectedItem(item);
    setTimeout(() => {
      setDrawerOpen(true);
    }, []);
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
  const handleDelete = async (id) => {
    try {
      const response = await httpServices.delete(`/item/${id}`);
      Toast({ mode: "success", message: "Item deleted successfully!" });
      fetchData(true , 1);
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
    const handleScroll = (e) => {
      const bottom =
        document.documentElement.scrollHeight - window.scrollY ===
        window.innerHeight;
      if (bottom && pagination.currentPage < pagination.totalPages) {
        setPagination((prev) => ({
          ...prev,
          currentPage: prev.currentPage + 1,
        }));
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [pagination.currentPage, pagination.totalPages]);

  useEffect(() => {
    fetchData(true, 1);
  }, [filter]);

  useEffect(() => {
    if (pagination?.currentPage !== 1) {
      fetchData(false);
    }
  }, [pagination.currentPage]);
  useEffect(() => {
    getCategory();
    getBranches();
  }, []);
  return (
    <div className="view-items-container">
      <div className="items-main-page">
        <div>
          <div className="items-header">
            <div className="items-title">Items</div>
            <button
              className="add-button"
              onClick={() => setOpenCreateDrawer(true)}
            >
              + Add New Item
            </button>
          </div>
          <div className="cards-container">
            {data?.map((item, index) => (
              <div className="container-item-card" key={index}>
                <ItemCard
                  item={item}
                  onClick={() => {
                    setSelectedItem(item);
                    setOpenViewDrawer(true);
                  }}
                  handleEdit={handleEditClick}
                  handleDelete={handleDelete}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="filters-container">
          <div className="filter-drawer">
            <div className="filter-header">
              <h3 className="filter-title">Filter Options</h3>
            </div>
            <div className="filters">
              <Select
                className="filter-item"
                label="Branch"
                options={branchOptions}
                value={filter.branch_id}
                setValue={(value) => handleChange("branch_id", value)}
                placeholder="Select branch"
                required={false}
              />
              <Select
                className="filter-item"
                label="Category"
                options={categoryOptions}
                value={filter.category_id}
                setValue={(value) => handleChange("category_id", value)}
                placeholder="Select category"
                required={false}
              />
              <Input
                className="filter-item"
                label="Name"
                placeholder="Enter Item name"
                inputValue={filter.name}
                setInputValue={(value) => handleChange("name", value)}
                errorMsg={""}
                type="text"
                required={false}
              />
              <div className="filter-actions">
                <button
                  className="action-button reset-button"
                  onClick={() => {
                    setFilter({
                      branch_id: { value: null, label: "" },
                      category_id: { value: null, label: "" },
                      name: "",
                    });
                  }}
                >
                  Reset
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ViewItemDetails
        data={selectedItem}
        isDrawerOpen={openViewDrawer}
        setDrawerOpen={setOpenViewDrawer}
      />
      <MySideDrawer isOpen={isDrawerOpen} setIsOpen={setDrawerOpen}>
        {selectedItem && (
          <CreateItem
          fetchData={fetchData}
            selectedItem={selectedItem || null}
            setIsOpen={setDrawerOpen}
          />
        )}
      </MySideDrawer>
      <MySideDrawer isOpen={openCreateDrawer} setIsOpen={setOpenCreateDrawer}>
        <CreateItem
          fetchData={fetchData}
          setIsOpen={setOpenCreateDrawer}
        />
      </MySideDrawer>
    </div>
  );
};

export default ViewItems;
