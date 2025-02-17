import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import "./style.scss";

const Navbar = () => {
  const state = useSelector((state) => state.handleCart);

  const navItems = [
    { title: "Home", to: "/" },
    {
      title: "Products",
      dropdown: [
        { title: "Category 1", to: "/product" },
        { title: "Category 2", to: "/product" },
      ],
    },
    {
      title: "About",
      dropdown: [
        { title: "Our Team", to: "/about" },
        { title: "Careers", to: "/about" },
      ],
    },
    {
      title: "Contact",
      dropdown: [
        { title: "Email Us", to: "/contact" },
        { title: "Locations", to: "/contact" },
      ],
    },
    {
      title: "Admin",
      dropdown: [
        { title: "Create Branch", to: "/admin/new/branch" },
        { title: "Create New Menu", to: "/admin/new/menu" },
        { title: "View Menu", to: "/admin/view/menu" },
        { title: "View Items", to: "/admin/view/item" },
        { title: "View Branches", to: "/admin/view/branches" },
      ],
    },
  ];

  return (
    <nav className="navbar navbar-expand-lg bg-light sticky-top navbar-container">
      <div className="container">
        <NavLink className="navbar-brand fw-bold fs-2" to="/">
          Luxora
        </NavLink>
        {/* <button
          className="navbar-toggler mx-2"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button> */}

        {/* <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="nav-items-container navbar-nav m-auto my-2 text-center">
            {navItems.map((item, index) =>
              item.dropdown ? (
                <li className="nav-item dropdown" key={index}>
                  <NavLink
                    className="nav-link dropdown-toggle"
                    id={`${item.title}Dropdown`}
                    role="button"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    {item.title}
                  </NavLink>
                  <div
                    className="dropdown-menu"
                    aria-labelledby={`${item.title}Dropdown`}
                  >
                    {item.dropdown.map((subItem, subIndex) => (
                      <NavLink
                        className="dropdown-item"
                        to={subItem.to}
                        key={subIndex}
                      >
                        {subItem.title}
                      </NavLink>
                    ))}
                  </div>
                </li>
              ) : (
                <li className="nav-item" key={index}>
                  <NavLink className="nav-link" to={item.to}>
                    {item.title}
                  </NavLink>
                </li>
              )
            )}
          </ul>
          <div className="buttons text-center">
            <NavLink to="/login" className="btn m-2">
              <i className="fa fa-sign-in-alt mr-1"></i> Login
            </NavLink>
            <NavLink to="/register" className="btn m-2">
              <i className="fa fa-user-plus mr-1"></i> Register
            </NavLink>
            <NavLink to="/cart" className="btn m-2">
              <i className="fa fa-cart-shopping mr-1"></i> Cart ({state.length})
            </NavLink>
          </div>
        </div> */}
      </div>
    </nav>
  );
};

export default Navbar;
