/* global document */
import "./styles.css";
import toast from "react-hot-toast";

// Modal for confirming deletion of a recipe
// State held in parent component (Modal) and passed thru props

// For the sake of this codebase just pretend that "pizza" means "recipe"

const ConfirmDelete = (props) => {
  // Delete pizza function, also gives back scroll since the modal closes
  const deletePizza = () => {
    props.deletePizza(props._id, props.refresh, props.setRefresh);
    document.body.style.overflow = "unset";
    toast("Recipe deleted.");
  };

  // Return JSX -----------------------------------------------

  if (!props.showConfirmation) {
    return <div className="nothing"></div>;
  } else
    return (
      <div className="confirmDelete--bg">
        <div className="confirmDelete--container">
          <div className="confirmDelete--content">
            <h2>Are you sure you want to delete this recipe?</h2>
            <h3>Deleted recipes cannot be retrieved.</h3>{" "}
            {/* Back and delete buttons */}
            <span>
              <button onClick={() => props.setShowConfirmation(false)}>
                Back
              </button>

              <button className="deleteButton" onClick={() => deletePizza()}>
                Delete
              </button>
            </span>
          </div>
        </div>
      </div>
    );
};

export default ConfirmDelete;
