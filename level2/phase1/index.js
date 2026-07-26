import express from "express";
import dotenv from "dotenv";
import connectDB from "./lib/db.js";
import { User } from "./models/user.model.js";
import { Redis } from "ioredis";
import rateLimiter from "./middleware/ratelimit.js";

dotenv.config();

const port = process.env.PORT || 5000;

const app = express();

export const redis = new Redis(process.env.REDIS_URL);

app.use(express.json());

app.get("/", (req, res) => {
  return res.status(200).json({ message: "Hello from server" });
});

app.post("/create", async (req, res) => {
  const { name, email, password } = req.body;
  const user = await User.create({ name, email, password });
  await redis.del("user:all");

  if (!user) {
    return res.status(400).json({ message: "User not created" });
  }

  return res.status(200).json({ message: "User created successfully", user });
});

// Get data

app.get("/get", rateLimiter, async (req, res) => {
  const user = await User.find();
  return res.json(user);
});

// Get api with Redis

app.get("/get-with-redis", async (req, res) => {
  const cached = await redis.get("user:all");
  if (cached) {
    const user = JSON.parse(cached);
    return res.json(user);
  }
  const user = await User.find({});
  await redis.set("user:all", JSON.stringify(user));
  return res.json(user);
});

app.listen(port, () => {
  connectDB();
  console.log(`server is running at http://localhost:${port}`);
});
