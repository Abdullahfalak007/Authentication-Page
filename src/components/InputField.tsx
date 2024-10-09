import React from "react";
import "../styles/InputField.css";
import { InputFieldProps } from "../types/InputFieldProps";

const InputField: React.FC<InputFieldProps> = ({
  label,
  type,
  value,
  onChange,
  error,
}) => {
  return (
    <div className="input-field">
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={label}
        className={`input ${error ? "input-error" : ""}`}
      />
      {error && <span className="error-message">{error}</span>}
    </div>
  );
};

export default InputField;
