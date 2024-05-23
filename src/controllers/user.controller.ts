import { Request, Response } from "express";
import { z } from "zod";
import { errorFunction } from "../utils/error";
import pool from "../config/db";

const userSchema = z.object({
  first_name: z.string(),
  last_name: z.string(),
  email: z.string().email(),
  phone: z.string().min(10).max(10),
});

export const registerUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    console.log("inside fn registerUser");
    const validationResult = userSchema.safeParse(req.body);
    if (!validationResult.success) {
      return res.status(400).json({ error: validationResult.error.errors });
    }
    const { first_name, last_name, email, phone, dob } = req.body;
    const client = await pool.connect();
    const result = await client.query(
      "INSERT INTO users (first_name, last_name, email, phone, dob) VALUES ($1, $2, $3, $4, $5) RETURNING id, first_name, last_name, email, phone, dob",
      [first_name, last_name, email, phone, dob]
    );
    client.release();
    const user = result.rows[0];
    return res.status(200).json(errorFunction(false, "User registered!", user));
  } catch (error) {
    console.log(error);
    return res.status(500).json(errorFunction(true, "Internal server error!"));
  }
};
