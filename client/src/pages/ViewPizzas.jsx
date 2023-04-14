import Pizza from "../components/Pizza";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Spinner from "../components/Spinner";
import axios from "axios";
import "./styles.css";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";

// For the sake of this codebase just pretend that "pizza" means "recipe"

const ViewPizzas = () => {
  // Local state to store pizza data fetched from backend
  const [pizzaList, setPizzaList] = useState([]);
  const [refresh, setRefresh] = useState(false);

  // Global state form redux store
  const { pizza, isError, isLoading } = useSelector((state) => state.pizza);
  const { user } = useSelector((state) => state.auth);

  const navigate = useNavigate();

  // Hook to kick you back to login if you aren't authenticated
  useEffect(() => {
    if (isError) {
      toast("Please login to see recipes.");
    }

    if (!user) {
      navigate("/");
    }
  }, [user, navigate, isError]);

  // Hook to GET pizza data
  useEffect(() => {
    if (isError) {
      throw new Error("Error fetching pizza data.");
    }

    axios({
      method: "get",
      url: "/api/pizzas",
    })
      .then(function (response) {
        setPizzaList(response.data);
      })

      .catch((error) => {
        throw new Error(`Axios error:${error}`);
      });
  }, [isLoading, pizza, refresh, setRefresh]);

  // Return JSX -----------------------------------------------

  if (isLoading) {
    return <Spinner />;
  } else {
    return (
      <div>
        <div className="pizzas--top">
          {/* Create recipe button */}
          <Link to="/Create">
            <button className="containerButton">New Recipe</button>
          </Link>
          {/* Recipe search form */}
          <form autocomplete="off">
            <input
              className="pizzas--search"
              placeholder="Search for recipes."
            ></input>
          </form>
        </div>
        <div className="pizzas--container">
          {/* Recipe components mapped and rendered */}
          <div className="pizzas--Box">
            {pizzaList.map((pizzaCard) => (
              <div>
                <Pizza
                  refresh={refresh}
                  setRefresh={setRefresh}
                  pizza={pizzaCard}
                  key={pizzaCard._id}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
};

export default ViewPizzas;
