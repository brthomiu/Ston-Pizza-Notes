import Pizza from "../components/Pizza";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Spinner from "../components/Spinner";
import axios from "axios";
import "./styles.css";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import Footer from "../components/Footer";
import { InView } from "react-intersection-observer";

// For the sake of this codebase just pretend that "pizza" means "recipe"

const ViewPizzas = () => {
  // Local states to store pizza data fetched from backend, pagination, and search
  const [pizzaList, setPizzaList] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [paginateAmount, setPaginateAmount] = useState(6);
  const [searchFilter, setSearchFilter] = useState("");

  // Global state form redux store
  const { pizza, isError, isLoading } = useSelector((state) => state.pizza);
  const { user } = useSelector((state) => state.auth);

  // Initialize navigate
  const navigate = useNavigate();

  // Hook to kick you back to login if you aren't authenticated
  useEffect(() => {
    if (isError) {
      toast("Please login to see recipes.");
    }

    if (!user) {
      navigate("/");
      toast("Please login to see recipes.");
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

  // Pagination Function
  const paginate = (inputArray, amount) => {
    let paginationArray = inputArray.slice(0, amount);
    return paginationArray;
  };

  const handlePaginate = () => {
    let newAmount = paginateAmount + 3;
    setPaginateAmount(newAmount);
  };

  // Input handler for search form
  const onChange = (e) => {
    setSearchFilter(e.target.value.toLowerCase());
  };

  // Search Function
  const search = (inputArray, searchFilter, pizzaType) => {
    let outputArray = [];

    if (searchFilter.length > 0) {
      for (let i = 0; i < inputArray.length; i++) {
        if (inputArray[i].pizzaName.toLowerCase().includes(searchFilter))
          outputArray.push(inputArray[i]);
      }
      return outputArray;
    } else {
      return inputArray;
    }
  };

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
              onChange={onChange}
              className="pizzas--search"
              placeholder="Search for recipes."
            ></input>
          </form>
        </div>
        <div className="pizzas--container">
          {/* Recipe components mapped and rendered */}
          <div className="pizzas--Box">
            {paginate(search(pizzaList, searchFilter), paginateAmount).map((pizzaCard) => (
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
        <InView onChange={(inView) => handlePaginate()}>
          <Footer />
        </InView>
      </div>
    );
  }
};

export default ViewPizzas;
