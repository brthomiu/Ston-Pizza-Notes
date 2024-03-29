// Modal overlay component to display full recipe information
// Scrolling is disabled when modal is called

// For the sake of this codebase just pretend that "pizza" means "recipe"

/* global document */
import { useState } from "react";
import ConfirmDelete from "./ConfirmDelete";
import "./styles.css";
import { useSelector } from "react-redux";
import IngredientCloud from "./IngredientCloud";
import MobileDeleteButton from "./MobileDeleteButton";
import { BsXLg } from "react-icons/bs";
import Like from "./Like";
import DeleteButton from "./DeleteButton";

const Modal = (props) => {
  //State for delete confirmation dialog
  const [showConfirmation, setShowConfirmation] = useState(false);

  // Global user state
  const { user } = useSelector((state) => state.auth);

  // Close modal function - gives back scroll when modal closes
  const closeModal = () => {
    props.setModalOpen(false);
    document.body.style.overflow = "unset";
  };

  // Function to open confirm deletion component
  const confirmDelete = () => {
    setShowConfirmation(true);
  };

  // Return JSX -----------------------------------------------
  // Conditionally renders only if modal state is open
  // State stored in parent component (Pizza)

  if (!props.modalOpen) {
    return <div className="nothing"></div>;
  } else {
    return (
      <>
        {/* Modal background component with darken and blur */}
        <div className="modal--bg">
          <ConfirmDelete
            refresh={props.refresh}
            setRefresh={props.setRefresh}
            _id={props.pizza._id}
            deletePizza={props.deletePizza}
            showConfirmation={showConfirmation}
            setShowConfirmation={setShowConfirmation}
            pizza={props.pizza}
          />
          <div className="modal--container">
            {/* MOBILE ONLY - Like button with like counter */}
            <div className="modal--mobile-like">
              <Like
                _id={props.pizza._id}
                refresh={props.refresh}
                setRefresh={props.setRefresh}
                likers={props.pizza.likers}
                likePizza={props.likePizza}
                pizza={props.pizza}
              />
            </div>

            {/* MOBILE ONLY -  button to delete recipe */}
            {/* Only displays if user is the owner of the recipe */}
            {/* Hidden by media query unless on small display */}
            <MobileDeleteButton
              user={user}
              owner={props.pizza.owner}
              confirmDelete={confirmDelete}
            />

            {/* MOBILE ONLY -  button to close modal */}
            {/* Hidden by media query unless on small display */}
            <button onClick={() => closeModal()} className="modal--mobile-back">
              <BsXLg />
            </button>

            {/* Name of recipe */}
            <span className="modal--title">
              <br></br>
              <h1>{props.pizza.pizzaName}</h1>
            </span>

            {/* Name of recipe owner */}
            <span className="modal--owner">
              <p>Made by:</p>
              <p className="modal--name">{props.pizza.owner}</p>
            </span>

            {/* Ingredients rendered from ingredient array on recipe object */}
            <IngredientCloud
              pizza={props.pizza}
              capitalizeFirst={props.capitalizeFirst}
              ingredients={props.pizza.ingredients}
            />

            {/* Recipe body */}
            <span className="modal--recipe">
              <p>{props.pizza.recipe}</p>
            </span>

            {/* Like and delete */}
            <span className="modal--buttons">
              <Like
                _id={props.pizza._id}
                refresh={props.refresh}
                setRefresh={props.setRefresh}
                likers={props.pizza.likers}
                likePizza={props.likePizza}
                pizza={props.pizza}
              />
              <button onClick={() => closeModal()}>Close</button>
              <DeleteButton
                user={user}
                owner={props.pizza.owner}
                confirmDelete={confirmDelete}
                pizza={props.pizza}
              />
            </span>
          </div>
        </div>
      </>
    );
  }
};

export default Modal;
