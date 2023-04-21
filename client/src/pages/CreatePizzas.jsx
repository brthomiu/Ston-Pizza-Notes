import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createPizza, reset } from "../features/pizza/pizzaSlice";
import toast from "react-hot-toast";
import Spinner from "../components/Spinner";
import { useNavigate } from "react-router-dom";
import "./styles.css";

// For the sake of this codebase just pretend that "pizza" means "recipe"

const CreatePizzas = () => {
  // Local state for pizza entry
  const [formData, setFormData] = useState({
    owner: "",
    pizzaName: "",
    ingredients: [],
    recipe: "",
  });

  // Form data for pizza object
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
    navigate("/Recipes"); //Navigates to view pizzas page
    toast("New recipe created!");
  };

  // Dispatches login function with form input data
  // Throws error if passwords do not match
  // (/(?:,| )+/) - this splits by commas, spaces, and/or both. Currently deprecated. Regex hurts my brain.
  const onSubmit = (e) => {
    e.preventDefault();

    const pizzaData = {
      owner: userName,
      pizzaName,
      ingredients: ingredients.toLowerCase().split(","),
      recipe,
    };

    dispatch(createNewPizza(pizzaData));
  };

  // Return JSX -----------------------------------------------

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
        <form autocomplete="off" onSubmit={onSubmit}>
          {/* Recipe name entry section */}
          <div className="form-group">
            <input
              maxlength="40"
              type="pizzaName"
              className="pizzaName--form-control"
              id="pizzaName"
              name="pizzaName"
              value={pizzaName}
              placeholder="Name your recipe."
              onChange={onChange}
            />
          </div>
          {/* Ingredient entry section */}
          <div className="form-group">
            <textarea
              maxlength="300"
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
          {/* Recipe body entry section */}
          <div className="form-group">
            <textarea
              maxlength="600"
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
          {/* Recipe submission and back buttons */}
          <div className="form-group-buttons">
            <button
              onClick={() => navigate("/Recipes")}
              className="login--button-back"
            >
              Back
            </button>
            <button type="submit" className="login--button">
              Create Recipe
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default CreatePizzas;
