"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const connectToDb_1 = __importDefault(require("./utils/connectToDb"));
const logger_1 = __importDefault(require("./utils/logger"));
const routes_1 = __importDefault(require("./routes"));
const path = require("path");
dotenv_1.default.config({ path: "./.env" });
const app = (0, express_1.default)();
const port = process.env.PORT;
const cors = require('cors');
app.use(cors({
    origin: '*'
}));
// Middleware for handling JSON requests, called before the router
app.use(express_1.default.json());
// Express router
app.use(routes_1.default);
// Serve frontend
app.use(express_1.default.static(path.join(__dirname, '../../client/dist')));
app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, '../', '../', 'client', 'dist', 'index.html')));
// Start server on designated port
app.listen(port, () => {
    logger_1.default.info(`⚡️[server]: Server is running at http://localhost:${port}`);
    // Connect to DB
    (0, connectToDb_1.default)();
});
