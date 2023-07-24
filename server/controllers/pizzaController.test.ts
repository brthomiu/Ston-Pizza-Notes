import request from "supertest";
import express from "express";
import {
  createPizza,
  likePizza,
  getPizzas,
  deletePizza,
} from "./pizzaController";
import { describe, expect, it } from "@jest/globals";

describe("Pizza Controller", () => {
  const app = express();
  app.use(express.json());

  app.post("/api/pizzas", createPizza);
  app.get("/api/pizzas", getPizzas);
  app.delete("/api/pizzas/:id", deletePizza);
  app.put("/api/pizzas/:id", likePizza);

  // Test createPizza
  it("should create a new pizza", async () => {
    const newPizza = {
      owner: "John Doe",
      pizzaName: "Delicious Pizza",
      ingredients: "Tomato, Cheese, Pepperoni",
      recipe: "Bake it well!",
    };

    const response = await request(app).post("/api/pizzas").send(newPizza);
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("_id");
    expect(response.body).toHaveProperty("owner", newPizza.owner);
    expect(response.body).toHaveProperty("pizzaName", newPizza.pizzaName);
    expect(response.body).toHaveProperty("ingredients", newPizza.ingredients);
    expect(response.body).toHaveProperty("recipe", newPizza.recipe);
    expect(response.body).toHaveProperty("likers", []);
  });

  // Test getPizzas
  it("should get all pizzas", async () => {
    const response = await request(app).get("/api/pizzas");
    expect(response.status).toBe(200);
  });

  // Test likePizza
  it("should like/unlike a pizza", async () => {
    // Create a test pizza first
    const newPizza = {
      owner: "John Doe",
      pizzaName: "Test Pizza",
      ingredients: "Test Ingredient 1, Test Ingredient 2",
      recipe: "Test Recipe",
      likers: [],
    };
    const createResponse = await request(app)
      .post("/api/pizzas")
      .send(newPizza);
    expect(createResponse.status).toBe(201);

    // Like the pizza
    const likeResponse = await request(app).put(
      `/api/pizzas/${createResponse.body._id}`
    );
    expect(likeResponse.status).toBe(200);
    expect(likeResponse.body).toHaveProperty("id", createResponse.body._id);

    // Unlike the pizza
    const unlikeResponse = await request(app).put(
      `/api/pizzas/${createResponse.body._id}`
    );
    expect(unlikeResponse.status).toBe(200);
    expect(unlikeResponse.body).toHaveProperty("id", createResponse.body._id);
  });

  // Test deletePizza
  it("should delete a pizza", async () => {
    // Create a test pizza first
    const newPizza = {
      owner: "John Doe",
      pizzaName: "Test Pizza",
      ingredients: "Test Ingredient 1, Test Ingredient 2",
      recipe: "Test Recipe",
      likers: [],
    };
    const createResponse = await request(app)
      .post("/api/pizzas")
      .send(newPizza);
    expect(createResponse.status).toBe(201);

    // Delete the pizza
    const deleteResponse = await request(app).delete(
      `/api/pizzas/${createResponse.body._id}`
    );
    expect(deleteResponse.status).toBe(200);
    expect(deleteResponse.body).toHaveProperty("id", createResponse.body._id);
  });
});
