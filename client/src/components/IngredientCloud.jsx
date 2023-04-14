// Cloud of mapped ingredients, rendered inside the modal

const IngredientCloud = (props) => {
  // Return JSX -----------------------------------------------

  return (
    <div>
      <span className="modal--row">
        <h2>Ingredients:</h2>
      </span>
      <span className="modal--ingredients">
        {props.pizza.ingredients.map((ingredient) => {
          return (
            <p className="modal--ingredient">
              {props.capitalizeFirst(ingredient)}
            </p>
          );
        })}
      </span>
    </div>
  );
};

export default IngredientCloud;
