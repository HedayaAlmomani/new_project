import React, { useState, useEffect, useRef } from 'react';

const OTPInput = ({ length = 5, onChange }) => {
  const [otp, setOtp] = useState(Array(length).fill(''));
  const inputRefs = useRef([]);

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (value.length <= 1 && /^[0-9]*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      onChange(newOtp.join('')); // Pass the OTP value to the parent component
      if (index < length - 1 && value) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handlePaste = (e) => {
    const pastedValue = e.clipboardData.getData('Text');
    if (pastedValue.length === length) {
      setOtp(pastedValue.split(''));
      onChange(pastedValue); // Pass the OTP value to the parent component
    }
  };

  useEffect(() => {
    const firstInput = inputRefs.current[0];
    if (firstInput) firstInput.focus();
  }, []);

  return (
    <div className="otp-input-container" onPaste={handlePaste}>
      {otp.map((value, index) => (
        <input
          key={index}
          ref={(el) => inputRefs.current[index] = el}
          type="text"
          maxLength="1"
          value={value}
          onChange={(e) => handleChange(e, index)}
          className="otp-input-box"
          style={{
            width: '40px',
            height: '40px',
            margin: '0 5px',
            textAlign: 'center',
            fontSize: '20px',
            border: '1px solid #ccc',
            borderRadius: '5px',
          }}
        />
      ))}
    </div>
  );
};

export default OTPInput;
