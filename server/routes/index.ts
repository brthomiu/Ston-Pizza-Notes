import express from "express";
import user from "./userRoutes";
import login from "./loginRoutes";
import pizzas from "./pizzaRoutes";

const router = express.Router();

router.get("/healthcheck", (_, res) => res.sendStatus(200));

router.use(user, login, pizzas);

export default router;
