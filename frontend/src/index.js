import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import "../node_modules/font-awesome/css/font-awesome.min.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom"; // Import useLocation here
import { Provider } from "react-redux";
import store from "./redux/store";
import "./style.scss";
import {
  Home,
  Product,
  Products,
  AboutPage,
  ContactPage,
  Cart,
  Login,
  Register,
  Checkout,
  PageNotFound,
  Navbar,
} from "./pages";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import { Toaster } from "react-hot-toast";
import CreateMenu from "./components/Admin/CreateMenu";
import MenuViewer from "./components/Admin/MenuViewer";
import CreateBranch from "./components/Admin/CreateBranch";
import Loader from "./CoreComponent/Loader";
import CreateItem from "./components/Admin/CreateItem";
import ViewItems from "./components/Admin/ViewItems";
import ViewBranches from "./components/Admin/ViewBranches";
import SideMenu from "./CoreComponent/SideMenu";
import MySideMenu from "./components/MySideMenu";

const App = () => {
  const [showLoader, setShowLoader] = useState(false);
  const location = useLocation(); // useLocation hook here

  useEffect(() => {
    const handleShowLoader = () => setShowLoader(true);
    const handleHideLoader = () => setShowLoader(false);

    window.addEventListener("showLoader", handleShowLoader);
    window.addEventListener("hideLoader", handleHideLoader);

    return () => {
      window.removeEventListener("showLoader", handleShowLoader);
      window.removeEventListener("hideLoader", handleHideLoader);
    };
  }, []);

  return (
    <div>
      <div className="app-container">
        {/* {location.pathname !== "/login" && <MySideMenu />} */}
        <MySideMenu />
        <div className="main-content">
          {/* {location.pathname !== "/login" && <Navbar />} */}
          <Navbar />
          <Loader show={showLoader} />
          <ScrollToTop>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/product" element={<Products />} />
              <Route path="/product/:id" element={<Product />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/checkout" element={<Checkout />} />

              <Route path="/admin">
                <Route path="new/menu" element={<CreateMenu />} />
                <Route path="view/menu" element={<MenuViewer />} />
                <Route path="view/item" element={<ViewItems />} />
                <Route path="view/branches" element={<ViewBranches />} />
              </Route>

              <Route path="*" element={<PageNotFound />} />
              <Route path="/product/*" element={<PageNotFound />} />
            </Routes>
          </ScrollToTop>
          <Toaster />
        </div>
      </div>
    </div>
  );
};

const Root = () => (
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Root />);
