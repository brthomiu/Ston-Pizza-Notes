/* global console */
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { register, reset } from "../features/auth/authSlice";
import Spinner from "../components/Spinner";
import "./styles.css";
import toast from "react-hot-toast";

const Register = () => {
  // Local state for username, email, and password entry forms
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });
  const { name, email, password, password2 } = formData;

  // Initialize navigate and dispatch
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Global state from Redux store
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  // useEffect hook - Handles registration navigation depending on global state
  useEffect(() => {
    // Throws error if there is a registration error
    if (isError) {
      toast(message, { duration: 4000 });
    }
    // If registration is successful or user is already logged in, navigates to the recipes page
    if (isSuccess || user) {
      navigate("/Recipes");
    }
    // Reset state
    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  // Function to handle form string input
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // Dispatches login function with form input data
  // Throws error if passwords do not match
  const onSubmit = (e) => {
    e.preventDefault();

    if (password.length < 8) {
      toast("Your password must be at least 8 characters.", { duration: 4000 });
    } else if (password !== password2) {
      toast("Passwords do not match", { duration: 4000 });
    } else {
      const userData = {
        name,
        email,
        password,
      };

      dispatch(register(userData));
    }
  };

  // Return the spinner if state is loading
  if (isLoading) {
    return <Spinner />;
  }

  // Otherwise return registration section
  return (
    <div>
      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input
              autocomplete="off"
              type="text"
              className="login--form-control"
              id="name"
              name="name"
              value={name}
              placeholder="Enter your name"
              onChange={onChange}
            />
          </div>

          <div className="form-group">
            <input
              autocomplete="off"
              type="email"
              className="login--form-control"
              id="email"
              name="email"
              value={email}
              placeholder="Enter your email"
              onChange={onChange}
            />
          </div>

          <div className="form-group">
            <input
              autocomplete="off"
              type="password"
              className="login--form-control"
              id="password"
              name="password"
              value={password}
              placeholder="Enter a password"
              onChange={onChange}
            />
          </div>

          <div className="form-group">
            <input
              autocomplete="off"
              type="password"
              className="login--form-control"
              id="password2"
              name="password2"
              value={password2}
              placeholder="Confirm your password"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <button type="submit" className="login--button">
              Submit
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default Register;
