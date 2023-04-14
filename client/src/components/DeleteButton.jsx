// Delete button - conditional and only shows if the user owns the recipe

const DeleteButton = (props) => {
  // Return JSX -----------------------------------------------

  if (props.user.name !== props.owner) {
    return <div className="nothing"></div>;
  } else {
    return (
      <button
        className="deleteButton"
        onClick={() => props.confirmDelete()}
        onTouchStart={() => props.confirmDelete()}
      >
        Delete Recipe
      </button>
    );
  }
};

export default DeleteButton;
