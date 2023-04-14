/* global document */

// Main recipe component
// Mapped from recipe documents in MongoDB
// Rendered as preview cards on a grid on the ViewPizzas page component
// Houses a model component that displays full recipe info when toggled

// For the sake of this codebase just pretend that "pizza" means "recipe"

import "./styles.css";
import axios from "axios";
import Modal from "./Modal";
import { useState } from "react";
import Like from "./Like";

const Pizza = (props) => {
  // States for modal and refresh
  const [modalOpen, setModalOpen] = useState(false);

  // Open modal function
  const openModal = () => {
    setModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  // Function to parse recipe text into a preview
  const previewRecipe = (recipe, length) => {
    if (recipe.length > length) {
      let preview = `${recipe.slice(0, length - 2)}...`;
      return preview;
    } else {
      return recipe;
    }
  };

  // Function to capitalize first letter of ingredient
  const capitalizeFirst = (input) => {
    let output = `${input.slice(0, 1).toUpperCase()}${input
      .slice(1)
      .toLowerCase()}`;
    return output;
  };

  // Function to parse recipe text into a preview
  const previewIngredient = (recipe) => {
    let capRecipe = capitalizeFirst(recipe);
    if (capRecipe.length > 11) {
      let preview = `${capRecipe.slice(0, 8)}...`;
      return preview;
    } else {
      return capRecipe;
    }
  };

  // // Function to condense ingredients into a preview
  const previewIngredients = (ingredients) => {
    if (ingredients.length > 4) {
      let preview = [
        previewIngredient(ingredients[0]),
        previewIngredient(ingredients[1]),
        previewIngredient(ingredients[2]),
        `${ingredients.length - 3} more`,
      ];

      return preview;
    } else {
      return ingredients;
    }
  };

  // Pizza Like function
  const likePizza = (pizzaId, userId, refresh, setRefresh) => {
    axios({
      method: "PUT",
      url: `/api/pizzas/${pizzaId}${userId}`,
    })
      .catch((error) => {
        throw new Error(`Axios error:${error}`);
      })
      .then(() => {
        if (!refresh) {
          setRefresh(true);
        } else {
          setRefresh(false);
        }
      });
  };

  // Pizza deletion function
  const deletePizza = (pizzaId, refresh, setRefresh) => {
    axios({
      method: "DELETE",
      url: `/api/pizzas/${pizzaId}`,
    })
      .catch((error) => {
        throw new Error(`Axios error:${error}`);
      })
      .then(() => {
        if (!refresh) {
          setRefresh(true);
        } else {
          setRefresh(false);
        }
      });
  };

  // Return JSX -----------------------------------------------

  return (
    <>
      <Modal
        refresh={props.refresh}
        pizza={props.pizza}
        setRefresh={props.setRefresh}
        deletePizza={deletePizza}
        setModalOpen={setModalOpen}
        modalOpen={modalOpen}
        likePizza={likePizza}
        capitalizeFirst={capitalizeFirst}
      />
      <div className="pizza">
        <span className="pizza--title">
          <h1>{previewRecipe(props.pizza.pizzaName, 22)}</h1>
          <div className="pizza--title-row">
            <p>Made by:</p>
            <p className="pizza--title-name">{props.pizza.owner}</p>
          </div>
        </span>

        <span>
          <h2>Ingredients:</h2>
        </span>
        <span className="pizza--ingredients">
          {previewIngredients(props.pizza.ingredients).map((ingredient) => {
            return <p className="pizza--ingredient">{ingredient}</p>;
          })}
        </span>
        <span className="pizza--row">
          <p>{previewRecipe(props.pizza.recipe, 199)}</p>
        </span>

        <span className="pizza--bottom-buttons">
          <div className="pizza--like">
            <Like
              pizza={props.pizza}
              refresh={props.refresh}
              setRefresh={props.setRefresh}
              likers={props.pizza.likers}
              likePizza={likePizza}
            />
          </div>
          <button onClick={() => openModal()}>Show More</button>
        </span>
      </div>
    </>
  );
};

export default Pizza;
