import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout, reset } from "../features/auth/authSlice";
import Spinner from "../components/Spinner";
import { FaCaretSquareLeft } from "react-icons/fa";
import toast from "react-hot-toast";

const Home = () => {
  // Initialize navigate and dispatch
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Global state
  const { user } = useSelector((state) => state.auth);
  const { isLoading, isError, message } = useSelector((state) => state.auth);

  //Logout function
  const onLogout = () => {
    dispatch(logout()); //Logs user out
    dispatch(reset()); //Resets state
    navigate("/"); //Navigates to login page
  };

  // Hook to navigate to login page is user is not logged in
  useEffect(() => {
    if (isError) {
      toast(message);
    }

    if (!user) {
      navigate("/");
    }
  }, [user, navigate, isError, message, dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  // Return JSX -----------------------------------------------

  return (
    <div>
      <h1>Hello, {user.name}.</h1>
      <h2>Welcome to Stön Recipe Notes v0.3a</h2>
      <br></br>
      <button className="navbar--logout" onClick={onLogout}>
        <FaCaretSquareLeft style={{ marginRight: ".25rem" }} />
        Logout
      </button>
      <br></br>
    </div>
  );
};

export default Home;
