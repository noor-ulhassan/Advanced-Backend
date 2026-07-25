import express from "express";
import dotenv from "dotenv";

dotenv.config();

const port = process.env.PORT || 5000;

const app = express();

app.get("/", (req, res) => {
  return res.status(200).json({ message: "Hello from server" });
});

app.listen(port, () => {
  console.log(`server is running at http://localhost:${port}`);
});
