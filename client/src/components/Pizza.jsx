/* global document */

import "./styles.css";
import axios from "axios";
import Modal from "./Modal";
import { useState } from "react";
import { useSelector } from "react-redux";
import Like from "./Like";

const Pizza = (props) => {
  // States for modal and refresh
  const [modalOpen, setModalOpen] = useState(false);

  // Global state from Redux store
  const { user } = useSelector((state) => state.auth);

  // Open modal function
  const openModal = () => {
    setModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  // Function to parse recipe text into a preview
  const previewRecipe = (recipe, length) => {
    if (recipe.length > length) {
      let preview = `${recipe.slice(0, length-2)}...`;
      return preview;
    } else {
      return recipe;
    }
  };

  // Function to capitalize first letter of ingredient
  const capitalizeFirst = (input) => {
    let output = `${input.slice(0, 1).toUpperCase()}${
      input.slice(1).toLowerCase()
    }`;
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

  // Return JSX Component

  if (!modalOpen) {
    return (
      <div className="pizza">
        <span className="pizza--title">
          <h1>{previewRecipe(props.pizzaName, 22)}</h1>
          <div className="pizza--title-row">
            <p>Made by:</p>
            <p className="pizza--title-name">{props.owner}</p>
          </div>
        </span>
        <span>
          {" "}
          <h2>Ingredients:</h2>
        </span>
        <span className="pizza--ingredients">
          {previewIngredients(props.ingredients).map((ingredient) => {
            return <p className="pizza--ingredient">{ingredient}</p>;
          })}
        </span>
        <span className="pizza--row">
          <p>{previewRecipe(props.recipe, 199)}</p>
        </span>{" "}
        <span className="pizza--bottom-buttons">
          <div className="pizza--like">
            <Like
              _id={props._id}
              refresh={props.refresh}
              setRefresh={props.setRefresh}
              likers={props.likers}
              likePizza={likePizza}
            />
          </div>

          <button onClick={() => openModal()}>Show More</button>
        </span>
      </div>
    );
  } else {
    return (
      <>
        <Modal
          _id={props._id}
          refresh={props.refresh}
          likers={props.likers}
          setRefresh={props.setRefresh}
          deletePizza={deletePizza}
          pizzaName={props.pizzaName}
          owner={props.owner}
          ingredients={props.ingredients}
          recipe={props.recipe}
          setModalOpen={setModalOpen}
          likePizza={likePizza}
          capitalizeFirst={capitalizeFirst}
        />
        <div className="pizza">
          <span className="pizza--title">
            <h1>{previewRecipe(props.pizzaName, 22)}</h1>
            <div className="pizza--title-row">
              <p>Made by:</p>
              <p className="pizza--title-name">{props.owner}</p>
            </div>
          </span>

          <span>
            <h2>Ingredients:</h2>
          </span>
          <span className="pizza--ingredients">
            {previewIngredients(props.ingredients).map((ingredient) => {
              return <p className="pizza--ingredient">{ingredient}</p>;
            })}
          </span>
          <span className="pizza--row">
            <p>{previewRecipe(props.recipe, 199)}</p>
          </span>

          <span className="pizza--bottom-buttons">
            <div className="pizza--like">
              <Like
                _id={props._id}
                refresh={props.refresh}
                setRefresh={props.setRefresh}
                likers={props.likers}
                likePizza={likePizza}
              />
            </div>
            <button onClick={() => openModal()}>Show More</button>
          </span>
        </div>
      </>
    );
  }
};

export default Pizza;
