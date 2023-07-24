import request from "supertest";
import express, { Express } from "express";
import { Server } from "http";
import connectToDb from "./utils/connectToDb";
import log from "./utils/logger";
import router from "./routes";
import { describe, expect, it, beforeAll, afterAll } from "@jest/globals";

// Import Express
const app: Express = express();
app.use(express.json());
app.use(router);

// Close the server after testing is done
const stopServer = (server: Server) => {
  server.close();
};

describe("Server", () => {
  let server: Server;

  beforeAll(async () => {
    // Connect to DB before starting the server
    await connectToDb();
    server = app.listen(0); // Start the server on a random port (0)
    const { port } = server.address() as any;
    log.info(`Test server is running on port ${port}`);
  });

  afterAll(() => {
    stopServer(server);
  });

  // Test that the server responds with 404 for an unknown route
  it("should respond with 404 for unknown routes", async () => {
    const response = await request(app).get("/nonexistent-route");
    expect(response.status).toBe(404);
  });

  // Test that the server serves the frontend when accessing valid routes
  it("should serve the frontend for valid routes", async () => {
    const response = await request(app).get("/");
    expect(response.status).toBe(200);
    expect(response.header["content-type"]).toContain("text/html");
  });

});
