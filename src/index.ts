import express, { Request, Response } from "express";
import app from "./app";
import connectDB from "./config/db";
require("dotenv").config();

connectDB();

const port = process.env.PORT || 4000;

// Middleware to parse JSON
app.use(express.json());

// Define routes
app.get("/", (req: Request, res: Response) => {
  res.send("Hello, TypeScript with Node.js!");
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
