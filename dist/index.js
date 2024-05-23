"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const app_1 = __importDefault(require("./app"));
const user_routes_1 = require("../src/routes/user.routes");
const createTableQuery_1 = __importDefault(require("./config/createTableQuery"));
const db_1 = __importDefault(require("./config/db"));
dotenv_1.default.config();
app_1.default.use((0, cors_1.default)());
app_1.default.use((0, morgan_1.default)("dev"));
app_1.default.use("/api/v1/users", user_routes_1.userRouter);
const port = process.env.PORT;
const start = () => {
    db_1.default
        .query(createTableQuery_1.default)
        .then(() => {
        console.log("Users table created successfully or already exists.");
    })
        .catch((err) => {
        console.error("Error creating users table:", err);
    });
};
app_1.default.listen(port, () => {
    console.log(`server running on port ${port}`);
});
start();
