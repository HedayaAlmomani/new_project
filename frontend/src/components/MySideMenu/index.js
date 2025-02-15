import React from "react";
import SideMenu from "../../CoreComponent/SideMenu";
import {
  FaHome,
  FaShoppingCart,
  FaBox,
  FaInfoCircle,
  FaPhone,
  FaSignInAlt,
  FaCreditCard,
  FaTools,
  FaUsers,
  FaClipboardList,
  FaStore,
} from "react-icons/fa";
import "./style.scss";

const MySideMenu = () => {
  const menuItems = [
    {
      label: "Home",
      icon: <FaHome />,
      path: "/",
    },
    {
      label: "Cart",
      icon: <FaShoppingCart />,
      path: "/cart",
    },
    {
      label: "Checkout",
      icon: <FaCreditCard />,
      path: "/checkout",
    },
    {
      label: "About",
      icon: <FaInfoCircle />,
      path: "/about",
    },
    {
      label: "Contact",
      icon: <FaPhone />,
      path: "/contact",
    },
    {
      label: "Authentication",
      icon: <FaSignInAlt />,
      children: [
        { label: "Login", path: "/login" },
        { label: "Register", path: "/register" },
      ],
    },
    {
      label: "Admin",
      icon: <FaTools />,
      children: [
        {
          label: "Create Menu",
          path: "/admin/new/menu",
          icon: <FaClipboardList />,
        },
        {
          label: "View Menu",
          path: "/admin/view/menu",
          icon: <FaClipboardList />,
        },
        { label: "View Items", path: "/admin/view/item", icon: <FaBox /> },
        {
          label: "View Branches",
          path: "/admin/view/branches",
          icon: <FaUsers />,
        },
      ],
    },
    
  ];

  return <SideMenu menuItems={menuItems} />;
};

export default MySideMenu;
