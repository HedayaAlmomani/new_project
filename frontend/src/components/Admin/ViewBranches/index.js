import React, { useState, useEffect } from "react";
import httpServices from "../../../common/httpServices";
import "./style.scss";
import BranchCard from "../BranchCard";
import ViewBranchDetails from "../ViewBranchDetails";
import CreateBranch from "../CreateBranch";
import MySideDrawer from "../../../CoreComponent/SideDrawer";
import Toast from "../../../CoreComponent/Toast";

const ViewBranches = () => {
  const [data, setData] = useState([]);
  const [openViewDrawer, setOpenViewDrawer] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [openCreateDrawer, setOpenCreateDrawer] = useState(false);

  const getBranches = async () => {
    try {
      const response = await httpServices.get("/branch");
      setData(response?.data?.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (item) => {
    setSelectedItem(item);
    setTimeout(() => {
      setDrawerOpen(true);
    }, []);
  };
  const handleDelete = async (id) => {
    try {
      const response = await httpServices.delete(`/branch/${id}`);
      Toast({ mode: "success", message: "Branch deleted successfully!" });
      getBranches();
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getBranches();
  }, []);

  return (
    <div className="branches-container">
      <div className="branches-header">
        <div className="branches-title">Branch Overview</div>
        <button
          className="add-button"
          onClick={() => setOpenCreateDrawer(true)}
        >
          + Add New branch
        </button>
      </div>
      <div className="branch-cards">
        {data.length > 0 ? (
          data.map((branch) => (
            <BranchCard
              branch={branch}
              onClick={() => {
                setSelectedItem(branch);
                setOpenViewDrawer(true);
              }}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
            />
          ))
        ) : (
          <p>No branches available</p>
        )}
      </div>

      <ViewBranchDetails
        data={selectedItem}
        isDrawerOpen={openViewDrawer}
        setDrawerOpen={setOpenViewDrawer}
      />

      <MySideDrawer isOpen={isDrawerOpen} setIsOpen={setDrawerOpen}>
        {selectedItem && (
          <CreateBranch
            fetchData={getBranches}
            selectedItem={selectedItem || null}
            setIsOpen={setDrawerOpen}
          />
        )}
      </MySideDrawer>
      <MySideDrawer isOpen={openCreateDrawer} setIsOpen={setOpenCreateDrawer}>
        <CreateBranch
          fetchData={getBranches}
          item={selectedItem || null}
          setIsOpen={setOpenCreateDrawer}
        />
      </MySideDrawer>
    </div>
  );
};

export default ViewBranches;
