import toast from "react-hot-toast";

const Selector = (props) => {
  const searchSelectorHandler = (input, message) => {
    props.setSearchSelector(input);
    toast(`Searching by ${message}.`);
  };

  return (
    <div className="search--selector">
      <h2>Search by:</h2>
      <div className="search--selector-dropdown">
        <button
          onClick={() => searchSelectorHandler("pizzaName", "Name")}
          className="selector--button"
        >
          Name
        </button>
        <button
          onClick={() => searchSelectorHandler("owner", "Author")}
          className="selector--button"
        >
          Author
        </button>
        <button
          onClick={() => searchSelectorHandler("ingredients", "Ingredients")}
          className="selector--button"
        >
          Ingredients
        </button>
        <button
          onClick={() => searchSelectorHandler("recipe", "Recipe")}
          className="selector--button"
        >
          Recipe
        </button>
      </div>
    </div>
  );
};

export default Selector;
