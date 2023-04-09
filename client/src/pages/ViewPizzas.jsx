import Pizza from "../components/Pizza";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Spinner from "../components/Spinner";
import axios from "axios";
import "./styles.css";
import { useNavigate } from "react-router-dom";

const ViewPizzas = () => {
  // Local state to store pizza data fetched from backend
  const [pizzaList, setPizzaList] = useState([]);
  const [refresh, setRefresh] = useState(false);

 // Global state form redux store
  const { pizza, isError, isLoading } = useSelector((state) => state.pizza);
  const { user } = useSelector((state) => state.auth)

  const navigate = useNavigate()

  // Hook to kick you back to login if you aren't authenticated
  useEffect(() => {
    if (isError) {
      // eslint-disable-next-line no-undef
      console.log(message);
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

  if (isLoading) {
    return <Spinner />;
  } else {
    return (
      <div className="container">
        <div className="pizzas--Box">
          {pizzaList.map((pizza) => (
            <div>
              <Pizza
                refresh={refresh}
                setRefresh={setRefresh}
                key={pizza._id}
                _id={pizza._id}
                owner={pizza.owner}
                pizzaName={pizza.pizzaName}
                ingredients={pizza.ingredients}
                recipe={pizza.recipe}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }
};

export default ViewPizzas;
