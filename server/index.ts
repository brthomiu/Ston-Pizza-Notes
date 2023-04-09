import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import connectToDb from "./utils/connectToDb";
import log from "./utils/logger";
import router from "./routes";
import path = require("path");

dotenv.config({ path: "./.env" });

const app: Express = express();
const port = process.env.PORT;

const cors = require('cors');
app.use(cors({
    origin: '*'
}));

// Middleware for handling JSON requests, called before router
app.use(express.json());

// Express router
app.use(router);

// Serve frontend
app.use(express.static(path.join(__dirname, '../../client/dist')))

app.get('*', (req, res) =>
    res.sendFile(
        path.resolve(
            __dirname,
            '../',
            '../',
            'client',
            'dist',
            'index.html')
    )
)

// Start server on designated port
app.listen(port, () => {
  log.info(`⚡️[server]: Server is running at http://localhost:${port}`);

  // Connect to DB
  connectToDb();
});
