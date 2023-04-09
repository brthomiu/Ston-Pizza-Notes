import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createPizza, reset } from "../features/pizza/pizzaSlice";
import Spinner from "../components/Spinner";
import { useNavigate, Link } from "react-router-dom";
import "./styles.css";

const CreatePizzas = () => {
  // Local state for pizza entry
  const [formData, setFormData] = useState({
    owner: "",
    pizzaName: "",
    ingredients: [],
    recipe: "",
  });

  const { pizzaName, ingredients, recipe } = formData;

  // Initialize dispatch and navigate
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Global states from Redux store
  const { user } = useSelector((state) => state.auth);
  const { isLoading } = useSelector((state) => state.pizza);

  // Set pizza owner to name of user
  let userName = user.name;

  // Function to handle form string input
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  //Create New Pizza Function
  const createNewPizza = (pizzaData) => {
    dispatch(createPizza(pizzaData)); //Logs user out
    dispatch(reset()); //Resets state
    navigate("/Create"); //Navigates to view pizzas page
  };

  // Dispatches login function with form input data
  // Throws error if passwords do not match
  // (/(?:,| )+/) - this splits by commas, spaces, and/or both. Currently deprecated. Regex hurts my brain.
  const onSubmit = (e) => {
    e.preventDefault();

    const pizzaData = {
      owner: userName,
      pizzaName,
      ingredients: ingredients.split(/([ ][ ]|[,])/),
      recipe,
    };

    dispatch(createNewPizza(pizzaData));
  };

  // Return the spinner if state is loading
  if (isLoading) {
    return <Spinner />;
  }

  // Otherwise return pizza creation section
  return (
    <div>
      <div>
        <h2>New Recipe</h2>
        <br></br>
      </div>
      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type="pizzaName"
              className="pizzaName--form-control"
              id="pizzaName"
              name="pizzaName"
              value={pizzaName}
              placeholder="Name your recipe."
              onChange={onChange}
            />
          </div>

          <div className="form-group">
            <textarea
              rows="3"
              cols="40"
              type="ingredients"
              className="ingredients--form-control"
              id="ingredients"
              name="ingredients"
              value={ingredients}
              placeholder="Enter ingredients separated by commas."
              onChange={onChange}
            ></textarea>
          </div>

          <div className="form-group">
            <textarea
              rows="5"
              cols="40"
              type="recipe"
              className="recipe--form-control"
              id="recipe"
              name="recipe"
              value={recipe}
              placeholder="Add your recipe."
              onChange={onChange}
            ></textarea>
          </div>
          <div className="form-group">
            <Link to="/Recipes">
            <button type="submit" className="login--button">
              Create Recipe
            </button>
            </Link>
          </div>
        </form>
      </section>
    </div>
  );
};

export default CreatePizzas;
