import axios from "axios";
import pizzaService from "./pizzaService";
import jest, { describe, afterEach, expect, it } from "jest"

jest.mock("axios");

describe("PizzaService", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  // Test createPizza function
  it("should create a new pizza", async () => {
    const pizzaData = {
      owner: "John Doe",
      pizzaName: "Delicious Pizza",
      ingredients: "Tomato, Cheese, Pepperoni",
      recipe: "Bake it well!",
    };

    const expectedResponse = {
      _id: "pizza_id",
      owner: pizzaData.owner,
      pizzaName: pizzaData.pizzaName,
      ingredients: pizzaData.ingredients,
      recipe: pizzaData.recipe,
      likers: [],
    };

    axios.post.mockResolvedValue({ data: expectedResponse });

    const response = await pizzaService.createPizza(pizzaData);

    expect(axios.post).toHaveBeenCalledWith("/api/pizzas/", pizzaData);
    expect(response).toEqual(expectedResponse);
  });

  // Test likePizza function
  it("should like a pizza", async () => {
    const pizzaId = "pizza_id";
    const userId = "user_id";

    const expectedResponse = { id: `${pizzaId}${userId}` };

    axios.put.mockResolvedValue({ data: expectedResponse });

    const response = await pizzaService.likePizza(pizzaId, userId);

    expect(axios.put).toHaveBeenCalledWith(`/api/pizzas/:${pizzaId}${userId}`);
    expect(response).toEqual(expectedResponse);
  });

  // Test deletePizza function
  it("should delete a pizza", async () => {
    const pizzaId = "pizza_id";
    const token = "dummy_token";

    const expectedResponse = { id: pizzaId };

    axios.delete.mockResolvedValue({ data: expectedResponse });

    const response = await pizzaService.deletePizza(pizzaId, token);

    expect(axios.delete).toHaveBeenCalledWith(`/api/pizzas/:${pizzaId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    expect(response).toEqual(expectedResponse);
  });
});
