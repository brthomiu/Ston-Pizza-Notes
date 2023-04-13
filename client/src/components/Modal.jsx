/* global document */
import { useState } from "react";
import ConfirmDelete from "./ConfirmDelete";
import "./styles.css";
import { useSelector } from "react-redux";
import IngredientCloud from "./IngredientCloud";
import { BsTrashFill, BsXLg } from "react-icons/bs";
import Like from "./Like";

const Modal = (props) => {
  //State for delete confirmation dialog
  const [showConfirmation, setShowConfirmation] = useState(false);

  // Global user state
  const { user } = useSelector((state) => state.auth);

  // Close modal function
  const closeModal = () => {
    props.setModalOpen(false);
    document.body.style.overflow = "unset";
  };

  // Delete confirmation
  const confirmDelete = () => {
    setShowConfirmation(true);
  };

  if (user.name !== props.owner) {
    return (
      <>
        <div className="modal--bg">
          <div className="modal--container">
            <div className="modal--mobile-like">
            <Like
              _id={props._id}
              refresh={props.refresh}
              setRefresh={props.setRefresh}
              likers={props.likers}
              likePizza={props.likePizza}
            />
            </div>
            <button onClick={() => closeModal()} className="modal--mobile-back">
              <BsXLg />
            </button>
            <span className="modal--title">
              <br></br>

              <h1>{props.pizzaName}</h1>
            </span>
            <span className="modal--owner">
              <p>Made by:</p>
              <p className="modal--name">{props.owner}</p>
            </span>

            <IngredientCloud capitalizeFirst={props.capitalizeFirst} ingredients={props.ingredients} />

            <span className="modal--recipe">
              <p>{props.recipe}</p>
            </span>
            <span className="modal--buttons">
              <Like
                _id={props._id}
                refresh={props.refresh}
                setRefresh={props.setRefresh}
                likers={props.likers}
                likePizza={props.likePizza}
              />
              <button onClick={() => closeModal()}>Close</button>
            </span>
          </div>
        </div>
      </>
    );
  } else {
    if (!showConfirmation) {
      return (
        <>
          <div className="modal--bg">
            <div className="modal--container">
            <div className="modal--mobile-like">
            <Like
              _id={props._id}
              refresh={props.refresh}
              setRefresh={props.setRefresh}
              likers={props.likers}
              likePizza={props.likePizza}
            />
            </div>
              <button
                onClick={() => confirmDelete()}
                className="modal--mobile-x"
              >
                <BsTrashFill />
              </button>
              <button
                onClick={() => closeModal()}
                className="modal--mobile-back"
              >
                <BsXLg />
              </button>
              <span className="modal--title">
                <br></br>
                <h1>{props.pizzaName}</h1>
              </span>
              <span className="modal--owner">
                <p>Made by:</p>
                <p className="modal--name">{props.owner}</p>
              </span>
              <IngredientCloud capitalizeFirst={props.capitalizeFirst} ingredients={props.ingredients} />

              <span className="modal--recipe">
                <p>{props.recipe}</p>
              </span>
              <span className="modal--buttons">
                <Like
                  _id={props._id}
                  refresh={props.refresh}
                  setRefresh={props.setRefresh}
                  likers={props.likers}
                  likePizza={props.likePizza}
                />
                <button onClick={() => closeModal()}>Close</button>
                <button
                  className="deleteButton"
                  onClick={() => confirmDelete()}
                  onTouchStart={() => confirmDelete()}
                >
                  Delete Recipe
                </button>
              </span>
            </div>
          </div>
        </>
      );
    } else
      return (
        <>
          <div className="modal--bg">
            <ConfirmDelete
              refresh={props.refresh}
              setRefresh={props.setRefresh}
              _id={props._id}
              deletePizza={props.deletePizza}
              setShowConfirmation={setShowConfirmation}
            />
            <div className="modal--container">
            <div className="modal--mobile-like">
            <Like
              _id={props._id}
              refresh={props.refresh}
              setRefresh={props.setRefresh}
              likers={props.likers}
              likePizza={props.likePizza}
            />
            </div>
              <button
                onClick={() => confirmDelete()}
                className="modal--mobile-x"
              >
                <BsTrashFill />
              </button>
              <button
                onClick={() => closeModal()}
                className="modal--mobile-back"
              >
                <BsXLg />
              </button>
              <span className="modal--title">
                <br></br>

                <h1>{props.pizzaName}</h1>
              </span>
              <span className="modal--owner">
                <p>Made by:</p>
                <p className="modal--name">{props.owner}</p>
              </span>
              <IngredientCloud capitalizeFirst={props.capitalizeFirst} ingredients={props.ingredients} />

              <span className="modal--recipe">
                <p>{props.recipe}</p>
              </span>
              <span className="modal--buttons">
                <Like
                  _id={props._id}
                  refresh={props.refresh}
                  setRefresh={props.setRefresh}
                  likers={props.likers}
                  likePizza={props.likePizza}
                />
                <button onClick={() => closeModal()}>Close</button>
                <button
                  className="deleteButton"
                  onClick={() => confirmDelete()}
                >
                  Delete Recipe
                </button>
              </span>
            </div>
          </div>
        </>
      );
  }
};

export default Modal;
