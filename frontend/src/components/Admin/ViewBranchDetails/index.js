import React from "react";
import MySideDrawer from "../../../CoreComponent/SideDrawer";
import SimpleLabelValue from "../../../CoreComponent/SimpleLabelValue";
import { CloseIcon } from "../../../icons";
import "./style.scss";

const ViewBranchDetails = ({ data, isDrawerOpen, setDrawerOpen }) => {

  return (
    <div className="view-branches-details-container">
      <MySideDrawer isOpen={isDrawerOpen} setIsOpen={setDrawerOpen}>
        <div className="header">
          <div>{data?.branch_name}</div>
          <div>
            <CloseIcon onClick={() => setDrawerOpen(false)} stroke="#fff" />
          </div>
        </div>

        <div className="items-details">
          <SimpleLabelValue label="Restaurant" value={data?.restaurant?.name} />
          <SimpleLabelValue label="Branch Name" value={data?.branch_name} />
          <SimpleLabelValue label="Address" value={data?.address} />
          <SimpleLabelValue label="Phone" value={data?.phone} />
          <SimpleLabelValue label="Working Hours" value={data?.working_hours} />
          <SimpleLabelValue label="Manager Name" value={data?.manager_name} />
          <SimpleLabelValue label="Email" value={data?.email} />
          <SimpleLabelValue label="Location" value={data?.location} />
          <SimpleLabelValue
            label="Restaurant Email"
            value={data?.restaurant?.email}
          />
          <SimpleLabelValue
            label="Restaurant Phone"
            value={data?.restaurant?.phone}
          />
        </div>
      </MySideDrawer>
    </div>
  );
};

export default ViewBranchDetails;
