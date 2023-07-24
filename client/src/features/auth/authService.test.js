import axios from "axios";
import authService from "./authService";
import jest, { describe, afterEach, expect, it } from "jest"

jest.mock("axios");

describe("AuthService", () => {
  
  afterEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  // Test register function
  it("should register a new user", async () => {
    const userData = {
      name: "John Doe",
      email: "johndoe@example.com",
      password: "password123",
    };

    const expectedResponse = {
      _id: "user_id",
      name: "John Doe",
      email: "johndoe@example.com",
    };

    axios.post.mockResolvedValue({ data: expectedResponse });

    const response = await authService.register(userData);

    expect(axios.post).toHaveBeenCalledWith("/api/users/", userData);
    expect(localStorage.getItem("user")).toEqual(
      JSON.stringify(expectedResponse)
    );
    expect(response).toEqual(expectedResponse);
  });

  // Test login function
  it("should log in a user", async () => {
    const userData = {
      email: "johndoe@example.com",
      password: "password123",
    };

    const expectedResponse = {
      _id: "user_id",
      name: "John Doe",
      email: "johndoe@example.com",
    };

    axios.post.mockResolvedValue({ data: expectedResponse });

    const response = await authService.login(userData);

    expect(axios.post).toHaveBeenCalledWith("/api/users/login", userData);
    expect(localStorage.getItem("user")).toEqual(
      JSON.stringify(expectedResponse)
    );
    expect(response).toEqual(expectedResponse);
  });

  // Test logout function
  it("should log out a user", () => {
    localStorage.setItem(
      "user",
      JSON.stringify({
        _id: "user_id",
        name: "John Doe",
        email: "johndoe@example.com",
      })
    );

    authService.logout();

    expect(localStorage.getItem("user")).toBeNull();
  });
});
