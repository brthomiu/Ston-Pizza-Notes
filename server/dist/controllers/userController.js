"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMe = exports.loginUser = exports.registerUser = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const userModel_1 = require("../models/userModel");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = require("jsonwebtoken");
const secret = () => {
    let newSecret = process.env.JWT_SECRET;
    if (typeof newSecret !== "string") {
        throw new Error("JWT Secret invalid");
    }
    else
        return newSecret;
};
//Generate JWT
const generateToken = (id) => {
    return (0, jsonwebtoken_1.sign)({ id }, secret(), {
        expiresIn: "30d",
    });
};
// Register new user
// POST /api/users
exports.registerUser = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    const defaultDescription = `${name} has not created a profile yet.`;
    if (!name || !email || !password) {
        res.status(400);
        throw new Error("Please add all fields");
    }
    // Check if user exists
    const userExists = yield userModel_1.User.findOne({ email });
    if (userExists) {
        res.status(400);
        throw new Error("User already exists.");
    }
    // Hash password
    const salt = yield bcryptjs_1.default.genSalt(10);
    const hashedPassword = yield bcryptjs_1.default.hash(password, salt);
    // Create user
    const user = yield userModel_1.User.create({
        name,
        email,
        password: hashedPassword,
        description: defaultDescription,
        private: false,
        recipes: [],
        favorites: [],
    });
    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user.name),
            description: user.description
        });
    }
    else {
        res.status(400);
        throw new Error("Invalid user data");
    }
}));
// Authenticate a user
// POST /api/login
exports.loginUser = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    // Check for user email
    const user = yield userModel_1.User.findOne({ email });
    if (user && (yield bcryptjs_1.default.compare(password, user.password))) {
        console.log("Authentication successful!");
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user.name),
        });
    }
    else {
        res.status(400);
        throw new Error("Invalid credentials.");
    }
}));
// Get user data
// POST /api/users/me
// Private
exports.getMe = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("getMe user:", req.user);
    res.status(200).json(req.user);
}));
