"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userRoutes_1 = __importDefault(require("./userRoutes"));
const loginRoutes_1 = __importDefault(require("./loginRoutes"));
const pizzaRoutes_1 = __importDefault(require("./pizzaRoutes"));
const router = express_1.default.Router();
router.get("/healthcheck", (_, res) => res.sendStatus(200));
router.use(userRoutes_1.default, loginRoutes_1.default, pizzaRoutes_1.default);
exports.default = router;
