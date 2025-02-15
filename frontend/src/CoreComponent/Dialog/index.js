import React, { Fragment, useState } from "react";
import SVG from "react-inlinesvg";
import { close } from "../../icons";
import "./style.scss";
const Dialog = ({ viewHeader, header, open, setOpen, children }) => {
  return (
    <Fragment>
      {open && (
        <div className="dialog-container">
          <div className="overlay">
            <div className="content-wrapper">
              <div className="children-container">
                {viewHeader && (
                  <div className="title-container">
                    <span>{header}</span>
                    <SVG src={close} onClick={() => setOpen(false)}></SVG>
                  </div>
                )}
                {children}
              </div>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default Dialog;
