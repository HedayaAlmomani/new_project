import React from "react";
import MySideDrawer from "../../../CoreComponent/SideDrawer";
import SimpleLabelValue from "../../../CoreComponent/SimpleLabelValue";
import { backendUrlImages } from "../../../common/constant";
import { CloseIcon } from "../../../icons";
import "./style.scss";

const ViewItemDetails = ({ data, isDrawerOpen, setDrawerOpen }) => {
  return (
    <div className="view-items-details-container">
      <MySideDrawer isOpen={isDrawerOpen} setIsOpen={setDrawerOpen}>
        <div className="header">
          <div>{data?.name}</div>
          <div>
            <CloseIcon onClick={() => setDrawerOpen(false)} stroke="#fff" />
          </div>
        </div>
        <div className="container-of-image">
        <img
          src={`${backendUrlImages}${data?.image}`}
          alt={data?.name}
          className="item-image"
        />
        </div>
      
        <div className="description">{data?.description}</div>

        <div className="items-details">
          <SimpleLabelValue label="Price" value={<s>${data?.price}</s>} />
          <SimpleLabelValue
            label="Discounted Price"
            value={`${data?.discount_price} ${data?.currency}`}
          />
          <SimpleLabelValue label="Size" value={data?.size} />
          <SimpleLabelValue label="Flavor" value={data?.flavor} />
          <SimpleLabelValue label="Branch" value={data?.branch_name} />
          <SimpleLabelValue label="Category" value={data?.category_name} />
        </div>
      </MySideDrawer>
    </div>
  );
};

export default ViewItemDetails;
