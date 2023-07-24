import request from "supertest";
import express from "express";
import bcrypt from "bcryptjs";
import { registerUser, loginUser, getMe } from "./userController";
import { User } from "../models/userModel";
import { sign } from "jsonwebtoken";
import { jest, describe, expect, it } from "@jest/globals";

// Mock the User.create function to prevent creating database entries during testing
jest.mock("../models/userModel");

describe("User Controller", () => {
  const app = express();
  app.use(express.json());

  app.post("/api/users", registerUser);
  app.post("/api/login", loginUser);
  app.post("/api/users/me", getMe);

  // Test registerUser
  it("should register a new user", async () => {
    const newUser = {
      name: "John Doe",
      email: "johndoe@example.com",
      password: "password123",
    };

    // Mock the User.findOne function to return null since the user doesn't exist yet
    User.findOne = jest.fn().mockResolvedValue(null);

    // Mock the bcrypt.hash function to return the original password
    bcrypt.hash = jest.fn().mockResolvedValue(newUser.password);

    // Mock the User.create function to return the new user data
    const createMock = jest.spyOn(User, "create").mockResolvedValue({
      _id: "user_id",
      ...newUser,
    });

    const response = await request(app).post("/api/users").send(newUser);
    expect(response.status).toBe(201);
    expect(createMock).toHaveBeenCalledWith({
      name: newUser.name,
      email: newUser.email,
      password: newUser.password,
      description: `${newUser.name} has not created a profile yet.`,
      private: false,
      recipes: [],
      favorites: [],
    });
    expect(response.body).toHaveProperty("_id", "user_id");
    expect(response.body).toHaveProperty("name", newUser.name);
    expect(response.body).toHaveProperty("email", newUser.email);
    expect(response.body).toHaveProperty("token");
  });

  // Test loginUser
  it("should log in a user with valid credentials", async () => {
    const user = {
      _id: "user_id",
      name: "John Doe",
      email: "johndoe@example.com",
      password: "hashed_password", // Mocked hashed password
    };

    // Mock the User.findOne function to return the user with the mocked hashed password
    User.findOne = jest.fn().mockResolvedValue(user);

    // Mock the bcrypt.compare function to return true
    bcrypt.compare = jest.fn().mockResolvedValue(true);

    // Mock the generateToken function to return a dummy token
    const token = "dummy_token";
    jest.spyOn(global.Math, "random").mockReturnValue(0.5);
    sign.mockReturnValue(token);

    const response = await request(app).post("/api/login").send({
      email: user.email,
      password: "password123",
    });
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("_id", user._id);
    expect(response.body).toHaveProperty("name", user.name);
    expect(response.body).toHaveProperty("email", user.email);
    expect(response.body).toHaveProperty("token", token);
  });

  // Test getMe
  it("should get user data for a logged-in user", async () => {
    const user = {
      _id: "user_id",
      name: "John Doe",
      email: "johndoe@example.com",
    };

    const response = await request(app)
      .post("/api/users/me")
      .send({}, { user });
    expect(response.status).toBe(200);
    expect(response.body).toEqual(user);
  });
});
