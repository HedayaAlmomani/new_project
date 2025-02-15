import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Footer, Navbar } from "../../components";
import Input from "../../CoreComponent/Input";
import httpServices from "../../common/httpServices";
import Toast from "../../CoreComponent/Toast";
import { useDispatch } from "react-redux";
import { loginAction } from "../../redux/reducer/auth";
import "./style.scss";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({
    email: "",
    general: "",
  });
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError({
      email: "",
      general: "",
    });

    if (!validateEmail(email)) {
      setError((prevState) => ({
        ...prevState,
        email: "Invalid email format.",
      }));
      return;
    }

    setLoading(true);
    try {
      const response = await httpServices.post(
        "/login",
        {
          email,
          password,
        }
      );

      const userId = response?.data?.user?.id;
      const token = response?.data?.token;
      dispatch(loginAction({ token, userId }));

      const toastOptions = {
        mode: "success",
        message: "Login successful! Welcome back.",
      };
      Toast(toastOptions);
    } catch (err) {
      setError((prevState) => ({
        ...prevState,
        general:
          err.response?.data?.message || "Login failed. Please try again.",
      }));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page-container">
      
      <div className="container my-3 py-3">
        <div className="text-center page-title">Login</div>
        <div className="row my-4 h-100">
          <div className="col-md-4 col-lg-4 col-sm-8 mx-auto">
            <form onSubmit={handleSubmit}>
              <div className="my-3">
                <Input
                  label="Email address"
                  placeholder="name@example.com"
                  inputValue={email}
                  setInputValue={setEmail}
                  errorMsg={error.email}
                />
              </div>
              <div className="my-3">
                <Input
                  label="Password"
                  placeholder="Password"
                  inputValue={password}
                  setInputValue={setPassword}
                  type="password"
                />
              </div>
              {error.general && (
                <div className="alert alert-danger">{error.general}</div>
              )}
              <div className="my-3">
                <p>
                  New Here?{" "}
                  <Link
                    to="/register"
                    className="text-decoration-underline link-button"
                  >
                    Register
                  </Link>
                </p>
              </div>
              <div className="text-center">
                <button
                  className="my-2 mx-auto btn login-button"
                  type="submit"
                  disabled={loading || !email || !password}
                >
                  {loading ? "Logging in..." : "Login"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
