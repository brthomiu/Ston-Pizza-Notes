import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../features/auth/authSlice";
import "./styles.css";
import logo from "../assets/stonHeader.svg";
import { FaUserAlt, FaBook, FaCaretSquareLeft } from "react-icons/fa";

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
            <button>
              <FaBook style={{ marginRight: ".25rem" }} /> About
            </button>
          </Link>
          <Link to="/">
            <button className="navbar--register">
              <FaUserAlt style={{ marginRight: ".25rem" }} />
              Login
            </button>
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
          <Link to="/Recipes">
            <button>
              <FaBook style={{ marginRight: ".25rem" }} />
              Recipes
            </button>
          </Link>
          <button className="navbar--logout" onClick={onLogout}>
            <FaCaretSquareLeft style={{ marginRight: ".25rem" }} />
            Logout
          </button>
        </nav>
        <Link to="/Home">
          <button>
            <FaUserAlt style={{ marginRight: ".25rem" }} />
            {user.name}
          </button>
        </Link>
        <img className="navbar--logo" src={logo} alt="Logo" />
      </>
    );
  }
};

export default Navigation;
