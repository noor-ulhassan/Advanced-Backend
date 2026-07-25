import express from "express";
import dotenv from "dotenv";
import connectDB from "./lib/db.js";
import { User } from "./models/user.model.js";

dotenv.config();

const port = process.env.PORT || 5000;

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  return res.status(200).json({ message: "Hello from server" });
});

app.post("/create", async (req, res) => {
  const { name, email, password } = req.body;
  const user = await User.create({ name, email, password });

  if (!user) {
    return res.status(400).json({ message: "User not created" });
  }

  return res.status(200).json({ message: "User created successfully", user });
});

// Get data

app.get("/get", async (req, res) => {
  const user = await User.find();
  return res.json(user);
});

app.listen(port, () => {
  connectDB();
  console.log(`server is running at http://localhost:${port}`);
});
