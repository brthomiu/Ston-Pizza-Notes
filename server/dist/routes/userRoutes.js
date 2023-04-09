"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
const loginMiddleware_1 = require("../middleware/loginMiddleware");
const userController_2 = require("../controllers/userController");
const router = express_1.default.Router();
router.post("/api/users", userController_1.registerUser);
router.get("/me", loginMiddleware_1.protect, userController_2.getMe);
exports.default = router;
