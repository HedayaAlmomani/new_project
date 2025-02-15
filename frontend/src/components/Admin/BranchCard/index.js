import React from "react";
import { DeleteIcon, EditIcon } from "../../../icons";
import SVG from "react-inlinesvg";
import "./style.scss";

const BranchCard = ({ branch, onClick, handleDelete, handleEdit }) => {
  return (
    <div className="branch-card-container">
      <div className="branch-card" key={branch?.id} onClick={onClick}>
        <div className="branch-header">
          <h4>{branch?.branch_name}</h4>
          <span>{branch?.restaurant?.name || "N/A"}</span>
        </div>
        <div className="branch-details">
          <p>
            <strong>Phone:</strong> {branch?.phone || "N/A"}
          </p>
          <p>
            <strong>Manager:</strong> {branch?.manager_name || "N/A"}
          </p>
          <p>
            <strong>Email:</strong> {branch?.email || "N/A"}
          </p>
        </div>
      </div>
      <div className="card-actions">
        <SVG
          src={DeleteIcon}
          onClick={() => handleDelete(branch?.id)}
          width={20}
          height={20}
        />
        <SVG
          src={EditIcon}
          onClick={() => handleEdit(branch)}
          width={20}
          height={20}
        />
      </div>
    </div>
  );
};

export default BranchCard;
