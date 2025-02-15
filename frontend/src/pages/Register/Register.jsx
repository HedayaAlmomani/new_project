import React, { useState } from "react";
import { Footer, Navbar } from "../../components";
import { Link } from "react-router-dom";
import httpServices from "../../common/httpServices";
import Toast from "../../CoreComponent/Toast";
import Input from "../../CoreComponent/Input";
import "./style.scss";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirmation: "",
    phone: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({
    email: "",
    passwordConfirmation: "",
    phone: "",
    general: "",
  });

  const handleChange = (field) => (value) => {
    setFormData({
      ...formData,
      [field]: value,
    });
    setError({
      ...error,
      [field]: "",
    });
  };

  const validateForm = () => {
    let valid = true;
    const newError = { ...error };

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\+?[1-9]\d{1,14}$/;

    if (!emailRegex.test(formData.email)) {
      newError.email = "Invalid email format.";
      valid = false;
    }

    if (formData.password !== formData.passwordConfirmation) {
      newError.passwordConfirmation = "Passwords do not match.";
      valid = false;
    }

    setError(newError);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(validateForm());

    if (!validateForm()) return;

    setLoading(true);
    setError((prevError) => ({ ...prevError, general: "" }));

    try {
      const response = await httpServices.post(
        "http://127.0.0.1:8000/api/users",
        {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          password_confirmation: formData.passwordConfirmation,
          phone: formData.phone,
        }
      );

      const toastOptions = {
        mode: "success",
        message: response?.data?.message,
      };
      Toast(toastOptions);
    } catch (error) {
      setError((prevError) => ({
        ...prevError,
        general:
          error.response?.data?.message ||
          "Registration failed. Please try again.",
      }));
    } finally {
      setLoading(false);
    }
  };

  const isFormValid = () => {
    return Object.values(formData).every((field) => field.trim() !== "");
  };

  return (
    <div className="register-page-container">
      
      <div className="container my-3 py-3">
        <div className="text-center page-title">Register</div>
        <div className="">
          <div className="col-md-4 col-lg-4 col-sm-8 mx-auto">
            <form className="register-form" onSubmit={handleSubmit}>
              <Input
                label="Full Name"
                placeholder="Enter Your Name"
                inputValue={formData.name}
                setInputValue={handleChange("name")}
                type="text"
              />
              <Input
                label="Email Address"
                placeholder="name@example.com"
                inputValue={formData.email}
                setInputValue={handleChange("email")}
                errorMsg={error.email}
              />
              <Input
                label="Password"
                placeholder="Password"
                inputValue={formData.password}
                setInputValue={handleChange("password")}
                type="password"
              />
              <Input
                label="Confirm Password"
                placeholder="Confirm Password"
                inputValue={formData.passwordConfirmation}
                setInputValue={handleChange("passwordConfirmation")}
                type="password"
                errorMsg={error.passwordConfirmation}
              />
              <Input
                label="Phone"
                placeholder="Phone"
                inputValue={formData.phone}
                setInputValue={handleChange("phone")}
                type="tel"
              />
              {error.general && (
                <div className="alert alert-danger">{error.general}</div>
              )}
              <div className="">
                <p>
                  Already have an account?
                  <Link
                    to="/login"
                    className="text-decoration-underline link-button"
                  >
                    Login
                  </Link>
                </p>
              </div>
              <div className="text-center">
                <button
                  className="btn register-button"
                  type="submit"
                  disabled={!isFormValid() || loading}
                >
                  {loading ? "Registering..." : "Register"}
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

export default Register;
