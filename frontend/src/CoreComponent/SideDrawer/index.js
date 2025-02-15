import React, { Fragment, useEffect } from "react";
import { slide as Menu } from "react-burger-menu";
import "./style.scss";

const MySideDrawer = ({ isOpen, setIsOpen, children }) => {
  const handleStateChange = (state) => {
    setIsOpen(state.isOpen);
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <Fragment>
      {isOpen && (
        <Menu right isOpen={isOpen} onStateChange={handleStateChange}>
          {children}
        </Menu>
      )}
    </Fragment>
  );
};

export default MySideDrawer;
