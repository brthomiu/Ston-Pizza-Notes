import expressAsyncHandler from "express-async-handler";
import { Pizza } from "../models/pizzaModel";

// Create new pizza
// POST /api/pizzas
export const createPizza = expressAsyncHandler(async (req, res) => {
  const { owner, pizzaName, ingredients, recipe } = req.body;

  if (!owner || !pizzaName || !ingredients || !recipe) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  // Create pizza
  const pizza = await Pizza.create({
    owner,
    pizzaName,
    ingredients,
    recipe,
    likers: [],
  });

  if (pizza) {
    res.status(201).json({
      _id: pizza._id,
      owner: pizza.owner,
      pizzaName: pizza.pizzaName,
      ingredients: pizza.ingredients,
      recipe: pizza.recipe,
      likers: pizza.likers,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

//@desc     Get pizzas
//@route    GET /api/pizzas
//@access   Private
export const getPizzas = expressAsyncHandler(async (req, res) => {
  const pizzas = await Pizza.find();

  res.status(200).json(pizzas);
});

//@desc     Like pizza
//@route    PUT /api/pizzas/:id
//@access   Private
export const likePizza = expressAsyncHandler(async (req: any, res) => {
  const pizzaId = req.params.id.slice(0, 24);
  const userId = req.params.id.slice(24);

  const pizza = await Pizza.findOne({ _id: pizzaId });

  let currentLikers = pizza.likers;

  const updateLikers = (currentLikers) => {
    if (!currentLikers.includes(userId)) {
      currentLikers.push(userId);
      let newLikers = currentLikers;
      return newLikers;
    } else {
      const index = currentLikers.indexOf(userId);
      if (index > -1) {
        // only splice array when item is found
        currentLikers.splice(index, 1); // 2nd parameter means remove one item only
        let newLikers = currentLikers;
        return newLikers;
      }
    }
  };
  console.log(pizza.likers);

  const filter = { _id: pizzaId };
  const update = { likers: updateLikers(currentLikers) };

  let doc = await Pizza.findOneAndUpdate(filter, update, { new: true });

  res.status(200).json({ id: req.params.id });
});

//@desc     Delete pizza
//@route    DELETE /api/pizzas/:id
//@access   Private
export const deletePizza = expressAsyncHandler(async (req: any, res) => {
  await Pizza.findByIdAndDelete(req.params.id);

  res.status(200).json({ id: req.params.id });
});
