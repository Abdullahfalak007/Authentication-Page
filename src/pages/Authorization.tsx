import React, { useState } from "react";
import InputField from "../components/InputField";
import "../styles/Authorization.css";
import { AuthorizationProps } from "../types/AuthorizationProps";
import * as yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Enter a valid email address")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const Authorization: React.FC<AuthorizationProps> = ({
  email,
  password,
  setEmail,
  setPassword,
}) => {
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {}
  );

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await schema.validate({ email, password }, { abortEarly: false });
      toast.success("Successfully logged in!");
      console.log("Signing in with:", { email, password });
    } catch (err) {
      if (err instanceof yup.ValidationError) {
        const errorMessages: { [key: string]: string } = {};
        err.inner.forEach((error) => {
          if (error.path) {
            errorMessages[error.path] = error.message;
          }
        });
        setErrors(errorMessages);
        toast.error("Please fix the errors in the form.");
      }
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSignIn}>
        <h2 className="auth-title">Authorization</h2>
        <InputField
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={errors.email}
        />
        <InputField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={errors.password}
        />
        <button type="submit" className="auth-button">
          SIGN IN
        </button>
        <div className="signup-prompt">
          Don't have an account? <a href="#">Sign Up</a>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Authorization;
