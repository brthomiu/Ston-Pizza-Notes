import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../features/auth/authSlice";
import "./styles.css";
import logo from "../assets/stonHeader.svg";

// Navigation bar component

const Navigation = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //Logout function
  const onLogout = () => {
    dispatch(logout()); //Logs user out
    dispatch(reset()); //Resets state
    navigate("/"); //Navigates to login page
  };

  // Global user state
  const { user } = useSelector((state) => state.auth);

  if (!user) {
    return (
      //Returns navigation bar
      <>
        <nav className="navbar">
          <Link to="/About">
            <button>About</button>
          </Link>
          <Link to="/ViewPizzas">
            <button>Browse</button>
          </Link>
          <Link to="/">
            <button>Login</button>
          </Link>
          <Link to="/Register">
            <button>Register</button>
          </Link>
        </nav>
        <img className="navbar--logo" src={logo} alt="Logo" />
      </>
    );
  } else {
    return (
      //Returns navigation bar
      <>
        <nav className="navbar">
          <Link to="/Home">
            <button>Home</button>
          </Link>
          <Link to="/CreatePizzas">
            <button>Create Pizza</button>
          </Link>
          <Link to="/ViewPizzas">
            <button>Browse</button>
          </Link>
          <button onClick={onLogout}>Logout</button>
        </nav>
        <img className="navbar--logo" src={logo} alt="Logo" />
      </>
    );
  }
};

export default Navigation;
