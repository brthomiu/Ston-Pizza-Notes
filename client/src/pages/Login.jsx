import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { login, reset } from "../features/auth/authSlice";
import Spinner from "../components/Spinner";
import "./styles.css";
import { FaUserAlt } from "react-icons/fa";

const Login = () => {
  // Local state for email and password entry forms
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;

  // Initialize navigate and dispatch
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Global state from Redux store
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  // useEffect hook - Handles login navigation depending on global state
  useEffect(() => {
    // Throws error if there is a login error
    if (isError) {
      toast.error(message);
    }
    // If login is successful or user is already logged in, navigates to the home page
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
  const onSubmit = (e) => {
    e.preventDefault();

    const userData = {
      email,
      password,
    };

    dispatch(login(userData));
  };

  // Return the spinner if state is loading
  if (isLoading) {
    return <Spinner />;
  }

  // Otherwise return login section
  return (
    <div>
      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input
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
            <button type="submit" className="login--button">
              Login
            </button>
          </div>

          <div className="form-group">
            <Link to="/Register">
              <button className="login--button-blue">
                <FaUserAlt style={{marginRight:'.25rem'}} />
                Register
              </button>
            </Link>
          </div>
        </form>
      </section>
    </div>
  );
};

export default Login;
