/* global document */
import "./styles.css";
import toast from "react-hot-toast";

const ConfirmDelete = (props) => {
  const deletePizza = () => {
    props.deletePizza(props._id, props.refresh, props.setRefresh);
    document.body.style.overflow = "unset";
    toast("Recipe deleted.")
  };

  return (
    <div className="confirmDelete--bg">
      <div className="confirmDelete--container">
        <div className="confirmDelete--content">
          <h2>Are you sure you want to delete this recipe?</h2>
          <h3>Deleted recipes cannot be retrieved.</h3>{" "}
          <span>
            <button onClick={() => props.setShowConfirmation(false)}>
              Back
            </button>

            <button
              className="deleteButton"
              onClick={() =>
                deletePizza()
              }
            >
              Delete
            </button>
          </span>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDelete;
