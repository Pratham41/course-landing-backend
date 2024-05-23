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
exports.registerUser = void 0;
const zod_1 = require("zod");
const error_1 = require("../utils/error");
const db_1 = __importDefault(require("../config/db"));
const userSchema = zod_1.z.object({
    first_name: zod_1.z.string(),
    last_name: zod_1.z.string(),
    email: zod_1.z.string().email(),
    phone: zod_1.z.string().min(10).max(10),
});
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("inside fn registerUser");
        const validationResult = userSchema.safeParse(req.body);
        if (!validationResult.success) {
            return res.status(400).json({ error: validationResult.error.errors });
        }
        const { first_name, last_name, email, phone, dob } = req.body;
        const client = yield db_1.default.connect();
        const result = yield client.query("INSERT INTO users (first_name, last_name, email, phone, dob) VALUES ($1, $2, $3, $4, $5) RETURNING id, first_name, last_name, email, phone, dob", [first_name, last_name, email, phone, dob]);
        client.release();
        const user = result.rows[0];
        return res.status(200).json((0, error_1.errorFunction)(false, "User registered!", user));
    }
    catch (error) {
        console.log(error);
        return res.status(500).json((0, error_1.errorFunction)(true, "Internal server error!"));
    }
});
exports.registerUser = registerUser;
