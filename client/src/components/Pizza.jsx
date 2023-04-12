/* global document */

import "./styles.css";
import axios from "axios";
import Modal from "./Modal";
import { useState } from "react";
import { useSelector } from "react-redux";

const Pizza = (props) => {
  // States for modal and refresh
  const [modalOpen, setModalOpen] = useState(false);

  // Global state from Redux store
  const { user } = useSelector(
    (state) => state.auth
  );

  // Open modal function
  const openModal = () => {
    setModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  // Function to parse recipe text into a preview
  const previewRecipe = (recipe) => {
    if (recipe.length > 140) {
      let preview = `${recipe.slice(0, 149)}.......`;
      return preview;
    } else {
      return recipe;
    }
  };

  // // Function to condense ingredients into a preview
  const previewIngredients = (ingredients) => {
    if (ingredients.length > 4) {
      let preview = [
        ingredients[0],
        ingredients[1],
        ingredients[2],
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
        <button onClick={() => likePizza(props._id, user._id, props.refresh, props.setRefresh)}>Like!</button>
        <span className="pizza--title">
          <h1>{props.pizzaName}</h1>
          <div className="pizza--title-row">
            <p>Made by:</p>
            <p className="pizza--title-name">{props.owner}</p>
          </div>
        </span>
        <span className="pizza--row">
          {" "}
          <h2>Ingredients:</h2>
        </span>
        <span className="pizza--ingredients">
          {previewIngredients(props.ingredients).map((ingredient) => {
            return <p className="pizza--ingredient">{ingredient}</p>;
          })}
        </span>
        <span className="pizza--row">
          <p>{previewRecipe(props.recipe)}</p>
        </span>
        <button onClick={() => openModal()}>Show More</button>
      </div>
    );
  } else {
    return (
      <>
        <Modal
          _id={props._id}
          refresh={props.refresh}
          setRefresh={props.setRefresh}
          deletePizza={deletePizza}
          pizzaName={props.pizzaName}
          owner={props.owner}
          ingredients={props.ingredients}
          recipe={props.recipe}
          setModalOpen={setModalOpen}
        />
        <div className="pizza">
          <span className="pizza--title">
            <h1>{props.pizzaName}</h1>
            <div className="pizza--title-row">
              <p>Made by:</p>
              <p className="pizza--title-name">{props.owner}</p>
            </div>
          </span>

          <span className="pizza--row">
            <h2>Ingredients:</h2>
          </span>
          <span className="pizza--ingredients">
            {previewIngredients(props.ingredients).map((ingredient) => {
              return <p className="pizza--ingredient">{ingredient}</p>;
            })}
          </span>
          <span className="pizza--row">
            <p>{previewRecipe(props.recipe)}</p>
          </span>
          <button onClick={() => openModal()}>Show More</button>
        </div>
      </>
    );
  }
};

export default Pizza;
