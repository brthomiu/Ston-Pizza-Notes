const IngredientCloud = (props) => {
  return (
    <div>
      <span className="modal--row">
        <h2>Ingredients:</h2>
      </span>
      <span className="modal--ingredients">
        {props.ingredients.map((ingredient) => {
          return <p className="modal--ingredient">{props.capitalizeFirst(ingredient)}</p>;
        })}
      </span>
    </div>
  );
};

export default IngredientCloud;
