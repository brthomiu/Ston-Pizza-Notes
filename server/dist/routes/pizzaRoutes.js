"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const pizzaController_1 = require("../controllers/pizzaController");
// import { protect } from "../middleware/loginMiddleware";
const router = express_1.default.Router();
router.post("/api/pizzas", pizzaController_1.createPizza);
router.get("/api/pizzas", pizzaController_1.getPizzas);
router.delete("/api/pizzas/:id", pizzaController_1.deletePizza);
router.put("/api/pizzas/:id", pizzaController_1.likePizza);
exports.default = router;
