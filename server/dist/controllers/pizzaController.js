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
exports.deletePizza = exports.likePizza = exports.getPizzas = exports.createPizza = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const pizzaModel_1 = require("../models/pizzaModel");
// Create new pizza
// POST /api/pizzas
exports.createPizza = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { owner, pizzaName, ingredients, recipe } = req.body;
    if (!owner || !pizzaName || !ingredients || !recipe) {
        res.status(400);
        throw new Error("Please add all fields");
    }
    // Create pizza
    const pizza = yield pizzaModel_1.Pizza.create({
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
    }
    else {
        res.status(400);
        throw new Error("Invalid user data");
    }
}));
//@desc     Get pizzas
//@route    GET /api/pizzas
//@access   Private
exports.getPizzas = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const pizzas = yield pizzaModel_1.Pizza.find();
    res.status(200).json(pizzas);
}));
//@desc     Like pizza
//@route    PUT /api/pizzas/:id
//@access   Private
exports.likePizza = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const pizzaId = req.params.id.slice(0, 24);
    const userId = req.params.id.slice(24);
    const pizza = yield pizzaModel_1.Pizza.findOne({ _id: pizzaId });
    let currentLikers = pizza.likers;
    const updateLikers = (currentLikers) => {
        if (!currentLikers.includes(userId)) {
            currentLikers.push(userId);
            let newLikers = currentLikers;
            return newLikers;
        }
        else {
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
    let doc = yield pizzaModel_1.Pizza.findOneAndUpdate(filter, update, { new: true });
    res.status(200).json({ id: req.params.id });
}));
//@desc     Delete pizza
//@route    DELETE /api/pizzas/:id
//@access   Private
exports.deletePizza = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield pizzaModel_1.Pizza.findByIdAndDelete(req.params.id);
    res.status(200).json({ id: req.params.id });
}));
