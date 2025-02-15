import React, { Fragment } from "react";
import { backendUrlImages } from "../../../common/constant";
import { DeleteIcon, EditIcon } from "../../../icons";
import SVG from "react-inlinesvg";
import "./style.scss";

const ItemCard = ({ item, onClick, handleDelete, handleEdit }) => {
  return (
    <div className="item-card">
      <div onClick={onClick}>
        <div className="image-container">
        <img
          src={`${backendUrlImages}${item.image}`}
          alt={item.name}
          className="item-image"
        />
        </div>
    
        <div className="item-details">
          <h5 className="item-name">{item.name}</h5>
          <p className="item-description">
            {item.description.length > 40
              ? item.description.slice(0, 40) + "..."
              : item.description}
          </p>
          <div className="item-pricing">
            <span className="item-price">
              {item.currency} {item.price}
            </span>
            {item.discount_price && (
              <span className="item-discount">
                {item.currency} {item.discount_price}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="card-actions">
        <SVG
          src={DeleteIcon}
          onClick={() => handleDelete(item?.id)}
          width={20}
          height={20}
        />
        <SVG
          src={EditIcon}
          onClick={() => handleEdit(item)}
          width={20}
          height={20}
        />
      </div>
    </div>
  );
};

export default ItemCard;
