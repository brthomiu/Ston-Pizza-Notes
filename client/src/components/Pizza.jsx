/* global document */

import "./styles.css";
import axios from "axios";
import Modal from "./Modal";
import { useState } from "react";

const Pizza = (props) => {
  // State for modal
  const [modalOpen, setModalOpen] = useState(false);

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

  // Pizza deletion function
  const deletePizza = (pizzaId, refresh, setRefresh) => {
    axios({
      method: "DELETE",
      url: `http://localhost:8000/api/pizzas/${pizzaId}`,
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

  if (!modalOpen) {
    return (
      <div className="pizza">
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
