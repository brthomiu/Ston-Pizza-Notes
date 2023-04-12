import express from "express";
import {
  createPizza,
  getPizzas,
  deletePizza,
  likePizza,
} from "../controllers/pizzaController";
// import { protect } from "../middleware/loginMiddleware";

const router = express.Router();

router.post("/api/pizzas", createPizza);

router.get("/api/pizzas", getPizzas);

router.delete("/api/pizzas/:id", deletePizza);

router.put("/api/pizzas/:id", likePizza)

export default router;
