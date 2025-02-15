import React, { useEffect, useState } from "react";
import axios from "axios";
import "./style.scss";
import httpServices from "../../../common/httpServices";

const MenuViewer = () => {
  const [branches, setBranches] = useState([]);
  const [menus, setMenus] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState(null);

  const getBranches = async () => {
    try {
      const response = await httpServices.get("/branch");

      const branchies = response?.data?.data?.map((item) => ({
        label: item?.branch_name,
        value: item?.id,
      }));
      setBranches(branchies);
    } catch (error) {
      console.error("Error fetching branches", error);
    }
  };

  const getMenus = async (branchId) => {
    try {
   
      const response = await httpServices.get( `/categories?branch_id=${branchId}`);

      setMenus(response?.data?.data || []);
    } catch (error) {
      console.error("Error fetching menus", error);
    }
  };

  useEffect(() => {
    getBranches();
  }, []);

  useEffect(() => {
    if (selectedBranch) {
      getMenus(selectedBranch);
    }
  }, [selectedBranch]);

  return (
    <div className="menu-viewer">
      <h2>View Menus</h2>

      <div className="tab-container">
        {branches.map((branch) => (
          <div
            key={branch.value}
            className={`tab ${selectedBranch === branch.value ? "active" : ""}`}
            onClick={() => setSelectedBranch(branch.value)}
          >
            {branch.label}
          </div>
        ))}
      </div>

      <div className="menus-container">
        {menus.length > 0 ? (
          <ul>
            {menus.map((menu) => (
              <li key={menu.id}>{menu.name}</li>
            ))}
          </ul>
        ) : (
          <p>No menus available for this branch.</p>
        )}
      </div>
    </div>
  );
};

export default MenuViewer;
