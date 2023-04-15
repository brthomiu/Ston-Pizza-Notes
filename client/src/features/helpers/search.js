export const search = (inputArray, searchFilter, pizzaType) => {
  let outputArray = [];

  const searchSwitch = (inputString, searchType) => {
    switch (searchType) {
      case "pizzaName":
        return inputString.pizzaName.toLowerCase();

      case "owner":
        return inputString.owner.toLowerCase();

      case "ingredients":
        return inputString.ingredients;

      case "recipe":
        return inputString.recipe.toLowerCase();

      default:
        "pizzaName";
        break;
    }
  };

  if (pizzaType == "ingredients") {
    for (let i = 0; i < inputArray.length; i++) {
      if (inputArray[i].ingredients.find((element) => element.includes(searchFilter)))
        outputArray.push(inputArray[i]);
    }
    return outputArray;
  } else {
    if (searchFilter.length > 0) {
      for (let i = 0; i < inputArray.length; i++) {
        if (searchSwitch(inputArray[i], pizzaType).includes(searchFilter))
          outputArray.push(inputArray[i]);
      }
      return outputArray;
    } else {
      return inputArray;
    }
  }
};

// Pagination Function
export const paginate = (inputArray, amount) => {
  let paginationArray = inputArray.slice(0, amount);
  return paginationArray;
};
