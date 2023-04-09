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
  });

  if (pizza) {
    res.status(201).json({
      _id: pizza._id,
      owner: pizza.owner,
      pizzaName: pizza.pizzaName,
      ingredients: pizza.ingredients,
      recipe: pizza.recipe,
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

//@desc     Delete pizza
//@route    DELETE /api/pizza/:id
//@access   Private
export const deletePizza = expressAsyncHandler(async (req: any, res) => {

  await Pizza.findByIdAndDelete(req.params.id);

  res.status(200).json({ id: req.params.id });
});
