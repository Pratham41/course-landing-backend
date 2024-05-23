"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const createTableQuery = `
  CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    phone VARCHAR(15),
    dob DATE
  );
`;
exports.default = createTableQuery;
