import React, { useState } from "react";
import Input from "../../CoreComponent/Input";
import httpServices from "../../common/httpServices";
import Toast from "../../CoreComponent/Toast";
import { useDispatch } from "react-redux";
import { loginAction } from "../../redux/reducer/auth";
import { LoginIcon } from "../../icons";
import SVG from "react-inlinesvg";
import OTPInput from "../../CoreComponent/OTPInput";
import "./style.scss";

const Login = () => {
  const [mobileNumber, setMobileNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState({
    mobileNumber: "",
    otp: "",
    general: "",
  });
  const [loading, setLoading] = useState(false);
  const [isOtpSent, setIsOtpSent] = useState(false);

  const dispatch = useDispatch();

  // TODO fix this function
  const validateMobileNumber = (number) => {
    // const mobileRegex = /^(962|\+962)[7-9][0-9]{7}$/;
    // return mobileRegex.test(number);
    return true
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError({
      mobileNumber: "",
      otp: "",
      general: "",
    });

    if (!validateMobileNumber(mobileNumber)) {
      setError((prevState) => ({
        ...prevState,
        mobileNumber: "Invalid mobile number format. Please enter a valid Jordanian number.",
      }));
      return;
    }

    if (!isOtpSent) {
      setLoading(true);
      try {
        const response = await httpServices.post(
          "http://localhost:8000/api/generate-otp",
          {
            mobile_no: mobileNumber,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json, text/plain, */*",
            },
          }
        );

        if (response?.data?.success) {
          setIsOtpSent(true);
        } else {
          setError((prevState) => ({
            ...prevState,
            general:
              response?.data?.message ||
              "Failed to send OTP. Please try again.",
          }));
        }
      } catch (err) {
        setError((prevState) => ({
          ...prevState,
          general:
            err?.response?.data?.message ||
            "Failed to send OTP. Please try again.",
        }));
      } finally {
        setLoading(false);
      }
    } else {
      setLoading(true);
      try {
        const response = await httpServices.post(
          "/verify-otp",

          {
            mobile_no: mobileNumber,
            otp: otp,
          }
        );
        if (response?.data?.success) {
          const userId = response?.data?.user?.id;
          const token = response?.data?.token;
          dispatch(loginAction({ token, userId }));
          Toast({
            mode: "success",
            message: "Login successful! Welcome back.",
          });
        }
      } catch (err) {
        setError((prevState) => ({
          ...prevState,
          otp: "Invalid OTP. Please try again.",
        }));
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="login-page-container">
      <div className="login-page container my-3 py-3">
        <div className="login-icon-container">
          <SVG src={LoginIcon} />
        </div>
        <div className="otp-title">
          {isOtpSent ? "Verification Code" : "OTP Verification"}
        </div>
        <div className="otp-note">
          {isOtpSent
            ? "Enter the verification code sent to your SMS"
            : "Enter phone number to send one time Password"}
        </div>

        <div className="row mobile-number-container">
          <div className="inputs-container col-md-4 col-lg-4 col-sm-8 mx-auto">
            <form onSubmit={handleSubmit}>
              {!isOtpSent && (
                <div className="my-3">
                  <Input
                    label="Mobile Number"
                    placeholder="+962 7XXXXXXXX"
                    inputValue={mobileNumber}
                    setInputValue={setMobileNumber}
                    errorMsg={error.mobileNumber}
                    type="tel"
                    required={false}
                  />
                </div>
              )}
              {isOtpSent && (
                <div className="my-3">
                  <OTPInput onChange={setOtp} />
                </div>
              )}
              {error.general && (
                <div className="alert alert-danger">{error.general}</div>
              )}
              <div className="text-center">
                <button
                  className="my-2 mx-auto btn login-button"
                  type="submit"
                  disabled={loading || !mobileNumber || (isOtpSent && !otp)}
                >
                  {loading
                    ? isOtpSent
                      ? "Verifying OTP..."
                      : "Sending OTP..."
                    : isOtpSent
                    ? "Submit OTP"
                    : "Send OTP"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
