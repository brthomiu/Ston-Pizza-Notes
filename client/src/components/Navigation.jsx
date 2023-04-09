import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "./styles.css";
import logo from "../assets/stonHeader.svg";
import { FaUserAlt, FaBook } from "react-icons/fa";

// Navigation bar component

const Navigation = () => {

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

          <Link to="/Profile">
          <button className="navbar--register">
            <FaUserAlt style={{ marginRight: ".25rem" }} />
            {user.name}
          </button>
        </Link>
        </nav>

        <img className="navbar--logo" src={logo} alt="Logo" />
      </>
    );
  }
};

export default Navigation;
