import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import app from "./app";
import { userRouter } from "../src/routes/user.routes";
import createTableQuery from "./config/createTableQuery";
import pool from "./config/db";

dotenv.config();

app.use(cors());

app.use(morgan("dev"));

app.use("/api/v1/users", userRouter);

const port = process.env.PORT;

const start = () => {
  pool
    .query(createTableQuery)
    .then(() => {
      console.log("Users table created successfully or already exists.");
    })
    .catch((err) => {
      console.error("Error creating users table:", err);
    })
};

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});

start();
